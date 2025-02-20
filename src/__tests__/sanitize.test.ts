import allMeasures, { AllMeasures, AllMeasuresSystems, AllMeasuresUnits } from '../definitions/all';
import { buildUnitAliasCache, sanitizeUnit, createUnitAliases } from '../sanitize';

test("createAliases", () => {
  const meterAliases = createUnitAliases("m", { singular: "Metre", plural: "Metres" });
  console.debug(meterAliases);

  expect(meterAliases).toEqual({
    "m": "m",
    "metre": "m",
    "metres": "m",
    "meter": "m",
    "meters": "m",
  });

  const kilogramPerSecondAliases = createUnitAliases("kg/s", { singular: "Kilogram per second", plural: "Kilograms per second" });
  console.debug(kilogramPerSecondAliases);

  expect(kilogramPerSecondAliases).toEqual({
    "kg_per_s": "kg/s",
    "kilogram_per_second": "kg/s",
    "kilograms_per_second": "kg/s",
  });
});

test('sanitizeUnit', () => {
  const aliasCache = buildUnitAliasCache<AllMeasures, AllMeasuresSystems, AllMeasuresUnits>(allMeasures);
  // expect(sanitizeUnit('dm3/w', aliasCache)).toBe('dm3/w');
  console.debug(aliasCache);

  // Test exponents:
  expect(sanitizeUnit('m²', aliasCache)).toBe('m2');
  expect(sanitizeUnit('m³', aliasCache)).toBe('m3');
  expect(sanitizeUnit('m⁴', aliasCache)).toBe('m4');
  expect(sanitizeUnit('m⁵', aliasCache)).toBe('m5');
  expect(sanitizeUnit('m⁶', aliasCache)).toBe('m6');
  expect(sanitizeUnit('m⁷', aliasCache)).toBe('m7');
  expect(sanitizeUnit('m⁸', aliasCache)).toBe('m8');
  expect(sanitizeUnit('m⁹', aliasCache)).toBe('m9');

  expect(sanitizeUnit("liter", aliasCache)).toBe("l");
  expect(sanitizeUnit("liters", aliasCache)).toBe("l");
  expect(sanitizeUnit("litre", aliasCache)).toBe("l");
  expect(sanitizeUnit("litres", aliasCache)).toBe("l");
  expect(sanitizeUnit("kilolitre", aliasCache)).toBe("kl");
  expect(sanitizeUnit("kilolitres", aliasCache)).toBe("kl");
  expect(sanitizeUnit("megalitre", aliasCache)).toBe("Ml");
  expect(sanitizeUnit("megalitres", aliasCache)).toBe("Ml");
  expect(sanitizeUnit("gigalitre", aliasCache)).toBe("Gl");
  expect(sanitizeUnit("gigalitres", aliasCache)).toBe("Gl");

  // Test mass and also make sure spaces are trimmed:
  expect(sanitizeUnit(' kilograms ', aliasCache)).toBe('kg');
  expect(sanitizeUnit(' kilogram ', aliasCache)).toBe('kg');
  expect(sanitizeUnit(' grams ', aliasCache)).toBe('g');
  expect(sanitizeUnit(' gram ', aliasCache)).toBe('g');
  expect(sanitizeUnit(' metric tons ', aliasCache)).toBe('mt');
  expect(sanitizeUnit(' metric ton ', aliasCache)).toBe('mt');
  expect(sanitizeUnit(' metric tonnes ', aliasCache)).toBe('mt');
  expect(sanitizeUnit(' pounds ', aliasCache)).toBe('lb');
  expect(sanitizeUnit(' pound ', aliasCache)).toBe('lb');
  expect(sanitizeUnit(' ounces ', aliasCache)).toBe('oz');
  expect(sanitizeUnit(' ounce ', aliasCache)).toBe('oz');

  // Test power:
  expect(sanitizeUnit('watts', aliasCache)).toBe('W');
  expect(sanitizeUnit('watt', aliasCache)).toBe('W');
  expect(sanitizeUnit('kilowatts', aliasCache)).toBe('kW');
  expect(sanitizeUnit('kilowatt', aliasCache)).toBe('kW');
  expect(sanitizeUnit('megawatts', aliasCache)).toBe('MW');
  expect(sanitizeUnit('megawatt', aliasCache)).toBe('MW');
  expect(sanitizeUnit('gigawatts', aliasCache)).toBe('GW');
  expect(sanitizeUnit('gigawatt', aliasCache)).toBe('GW');

  // Test energy:
  expect(sanitizeUnit('joules', aliasCache)).toBe('J');
  expect(sanitizeUnit('joule', aliasCache)).toBe('J');
  expect(sanitizeUnit('kilowatt hours', aliasCache)).toBe('kWh');
  expect(sanitizeUnit('kilowatt hour', aliasCache)).toBe('kWh');
  expect(sanitizeUnit('kilowatt-hours', aliasCache)).toBe('kWh');

  // Print out units that start with meter:
  const meterUnits = Object.keys(allMeasures).filter(unit => unit.startsWith("meter"));
  console.debug(meterUnits);

  // Test mass rate units (LONG)
  expect(sanitizeUnit('kilograms / second', aliasCache)).toBe('kg/s');
  expect(sanitizeUnit('kilograms / minute', aliasCache)).toBe('kg/min');
  expect(sanitizeUnit('kilograms / hour', aliasCache)).toBe('kg/h');
  expect(sanitizeUnit('kilograms / day', aliasCache)).toBe('kg/d');
  expect(sanitizeUnit('kilograms / week', aliasCache)).toBe('kg/w');
  expect(sanitizeUnit('kilograms / year', aliasCache)).toBe('kg/a');

  // Test mass rate units (SHORT)
  expect(sanitizeUnit('kg / s', aliasCache)).toBe('kg/s');
  expect(sanitizeUnit('kg / min', aliasCache)).toBe('kg/min');
  expect(sanitizeUnit('kg / h', aliasCache)).toBe('kg/h');
  expect(sanitizeUnit('kg / d', aliasCache)).toBe('kg/d');
  expect(sanitizeUnit('kg / w', aliasCache)).toBe('kg/w');
  expect(sanitizeUnit('kg / a', aliasCache)).toBe('kg/a');

  // Test volume rate units (LONG)
  expect(sanitizeUnit('liters / second', aliasCache)).toBe('l/s');
  expect(sanitizeUnit('liters / minute', aliasCache)).toBe('l/min');
  expect(sanitizeUnit('liters / hour', aliasCache)).toBe('l/h');
  expect(sanitizeUnit('liters / day', aliasCache)).toBe('l/d');
  expect(sanitizeUnit('liters / week', aliasCache)).toBe('l/w');
  expect(sanitizeUnit('liters / year', aliasCache)).toBe('l/a');

  // Test volume rate units (SHORT)
  expect(sanitizeUnit('l / s', aliasCache)).toBe('l/s');
  expect(sanitizeUnit('l / min', aliasCache)).toBe('l/min');
  expect(sanitizeUnit('l / h', aliasCache)).toBe('l/h');
  expect(sanitizeUnit('l / d', aliasCache)).toBe('l/d');
  expect(sanitizeUnit('l / w', aliasCache)).toBe('l/w');
  expect(sanitizeUnit('l / a', aliasCache)).toBe('l/a');

  // Test volume rate units (LONG)
  expect(sanitizeUnit('m^3 / second', aliasCache)).toBe('m3/s');
  expect(sanitizeUnit('m^3 / min', aliasCache)).toBe('m3/min');
  expect(sanitizeUnit('m^3 / hour', aliasCache)).toBe('m3/h');
  expect(sanitizeUnit('m^3 / day', aliasCache)).toBe('m3/d');
  expect(sanitizeUnit('m^3 / week', aliasCache)).toBe('m3/w');
  expect(sanitizeUnit('m^3 / year', aliasCache)).toBe('m3/a');

  // Test volume rate units (SHORT)
  expect(sanitizeUnit('m3 / s', aliasCache)).toBe('m3/s');
  expect(sanitizeUnit('m3 / min', aliasCache)).toBe('m3/min');
  expect(sanitizeUnit('m3 / h', aliasCache)).toBe('m3/h');
  expect(sanitizeUnit('m3 / d', aliasCache)).toBe('m3/d');
  expect(sanitizeUnit('m3 / w', aliasCache)).toBe('m3/w');
  expect(sanitizeUnit('m3 / a', aliasCache)).toBe('m3/a');

  // Make sure Python powers work:
  expect(sanitizeUnit('m ** 3 / s', aliasCache)).toBe('m3/s');
  expect(sanitizeUnit('m ** 3 / min', aliasCache)).toBe('m3/min');
  expect(sanitizeUnit('m ** 3 / h', aliasCache)).toBe('m3/h');
  expect(sanitizeUnit('m ** 3 / d', aliasCache)).toBe('m3/d');
  expect(sanitizeUnit('m ** 3 / w', aliasCache)).toBe('m3/w');
  expect(sanitizeUnit('m ** 3 / a', aliasCache)).toBe('m3/a');
});
