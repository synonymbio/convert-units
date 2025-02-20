import { Measure, Unit } from "./convert";

type UnitAliases = {
  [key: string]: string;
};

export const normalizeUnit = (unit: string): string => {
  let normalized = unit.toLowerCase();

  // Replace double asterisks with a caret.
  normalized = normalized.replace(/\ \*\*\ /g, '^');
  normalized = normalized.replace(/\*\*/g, '^');

  // Replace superscript powers that might come from Pint.
  normalized = normalized.replace(/²/g, '2');
  normalized = normalized.replace(/³/g, '3');
  normalized = normalized.replace(/⁴/g, '4');
  normalized = normalized.replace(/⁵/g, '5');
  normalized = normalized.replace(/⁶/g, '6');
  normalized = normalized.replace(/⁷/g, '7');
  normalized = normalized.replace(/⁸/g, '8');
  normalized = normalized.replace(/⁹/g, '9');

  // Replace exponents that might come from Pint.
  normalized = normalized.replace(/\^2/g, '2');
  normalized = normalized.replace(/\^3/g, '3');
  normalized = normalized.replace(/\^4/g, '4');
  normalized = normalized.replace(/\^5/g, '5');
  normalized = normalized.replace(/\^6/g, '6');
  normalized = normalized.replace(/\^7/g, '7');
  normalized = normalized.replace(/\^8/g, '8');
  normalized = normalized.replace(/\^9/g, '9');

  // Cubic units:
  // NOTE(milo): Very important to have the longest units first,
  // otherwise "m3" will be replaced with "meter" and throw off the unit parsing.
  const cubicMapping = [
    {from: "km3", to: "cubic kilometer"},
    {from: "cm3", to: "cubic centimeter"},
    {from: "mm3", to: "cubic millimeter"},
    {from: "m3", to: "cubic meter"},
    {from: "in3", to: "cubic inch"},
    {from: "ft3", to: "cubic foot"},
    {from: "yd3", to: "cubic yard"},
  ]

  for (const mapping of cubicMapping) {
    normalized = normalized.replace(mapping.from, mapping.to);
  }

  // Remove leading and trailing spaces
  normalized = normalized.trim();
  normalized = normalized.replace(/ /g, '_');
  normalized = normalized.replace(/-/g, '_');

  // Replace '_/_' with '_per_'
  normalized = normalized.replace(/\_\/\_/g, '_per_');
  // Replace ' / ' with '_per_'
  normalized = normalized.replace(/\//g, '_per_');

  return normalized;
}

export const createUnitAliases = (unit: string, names: { singular: string; plural: string }): UnitAliases => {
  const aliases: UnitAliases = {};
  const baseForms = [
    unit.toLowerCase(),
    normalizeUnit(unit),
    names.singular.toLowerCase(),
    names.plural.toLowerCase()
  ];

  baseForms.forEach(form => {
    // Replace spaces with underscores
    const normalized = normalizeUnit(form);
    aliases[normalized] = unit;

    if (normalized.includes("litre")) {
      aliases[normalized.replace("litre", "liter")] = unit;
    }

    if (normalized.includes("metre")) {
      aliases[normalized.replace("metre", "meter")] = unit;
    }

    if (normalized.includes("tonne")) {
      aliases[normalized.replace("tonne", "ton")] = unit;
    }
  });

  return aliases;
};

export function buildUnitAliasCache<
  TMeasures extends string,
  TSystems extends string,
  TUnits extends string,
>(measures: Record<TMeasures, Measure<TSystems, TUnits>>): Map<string, string> {
  const aliasCache = new Map<string, string>();

  for (const measure of Object.values(measures) as Measure<TSystems, TUnits>[]) {
    for (const system of Object.values(measure.systems) as Record<TUnits, Unit>[]) {
      for (const [unit, details] of Object.entries(system) as [string, Unit][]) {
        const aliases = createUnitAliases(unit, details.name);
        for (const [alias, standardUnit] of Object.entries(aliases)) {
          aliasCache.set(alias, standardUnit);
        }
      }
    }
  }

  return aliasCache;
}

export function sanitizeUnit(unit: string, aliasCache: Map<string, string>): string {
  const normalized = normalizeUnit(unit);
  return aliasCache.get(normalized) || normalized;
}