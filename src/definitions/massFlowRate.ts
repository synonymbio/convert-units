import { Measure, Unit } from './../index';

export type MassFlowRateUnits =
  | MassFlowRateMetricUnits
  | MassFlowRateImperialUnits;

export type MassFlowRateSystems = 'metric' | 'imperial';

export type MassFlowRateMetricUnits =
  | 'kg/s' | 'kg/min' | 'kg/h' | 'kg/d' | 'kg/w' | 'kg/a'
  | 'mt/s' | 'mt/min' | 'mt/h' | 'mt/d' | 'mt/w' | 'mt/a';

export type MassFlowRateImperialUnits =
  | 'lb/s' | 'lb/min' | 'lb/h' | 'lb/d' | 'lb/w' | 'lb/a';

const metric: Record<MassFlowRateMetricUnits, Unit> = {
  'kg/s': {
    name: {
      singular: 'Kilogram per second',
      plural: 'Kilograms per second',
    },
    to_anchor: 1,
  },
  'kg/min': {
    name: {
      singular: 'Kilogram per minute',
      plural: 'Kilograms per minute',
    },
    to_anchor: 1 / 60,
  },
  'kg/h': {
    name: {
      singular: 'Kilogram per hour',
      plural: 'Kilograms per hour',
    },
    to_anchor: 1 / 3600,
  },
  'kg/d': {
    name: {
      singular: 'Kilogram per day',
      plural: 'Kilograms per day',
    },
    to_anchor: 1 / 86400,
  },
  'kg/w': {
    name: {
      singular: 'Kilogram per week',
      plural: 'Kilograms per week',
    },
    to_anchor: 1 / 604800,
  },
  'kg/a': {
    name: {
      singular: 'Kilogram per year',
      plural: 'Kilograms per year',
    },
    to_anchor: 1 / 31536000,
  },
  'mt/s': {
    name: {
      singular: 'Metric ton per second',
      plural: 'Metric tons per second',
    },
    to_anchor: 1,
  },
  'mt/h': {
    name: {
      singular: 'Ton per hour',
      plural: 'Tons per hour',
    },
    to_anchor: 1 / 3.6,
  },
  'mt/min': {
    name: {
      singular: 'Ton per minute',
      plural: 'Tons per minute',
    },
    to_anchor: 1 / 216,
  },
  'mt/d': {
    name: {
      singular: 'Ton per day',
      plural: 'Tons per day',
    },
    to_anchor: 1 / 86400,
  },
  'mt/w': {
    name: {
      singular: 'Ton per week',
      plural: 'Tons per week',
    },
    to_anchor: 1 / 604800,
  },
  'mt/a': {
    name: {
      singular: 'Ton per year',
      plural: 'Tons per year',
    },
    to_anchor: 1 / 31536000,
  },
};

const imperial: Record<MassFlowRateImperialUnits, Unit> = {
  'lb/s': {
    name: {
      singular: 'Pound per second',
      plural: 'Pounds per second',
    },
    to_anchor: 1,
  },
  'lb/h': {
    name: {
      singular: 'Pound per hour',
      plural: 'Pounds per hour',
    },
    to_anchor: 1 / 3600,
  },
  'lb/min': {
    name: {
      singular: 'Pound per minute',
      plural: 'Pounds per minute',
    },
    to_anchor: 1 / 60,
  },
  'lb/d': {
    name: {
      singular: 'Pound per day',
      plural: 'Pounds per day',
    },
    to_anchor: 1 / 86400,
  },
  'lb/w': {
    name: {
      singular: 'Pound per week',
      plural: 'Pounds per week',
    },
    to_anchor: 1 / 604800,
  },
  'lb/a': {
    name: {
      singular: 'Pound per year',
      plural: 'Pounds per year',
    },
    to_anchor: 1 / 31536000,
  },
};

const measure: Measure<MassFlowRateSystems, MassFlowRateUnits> = {
  systems: {
    metric,
    imperial,
  },
  anchors: {
    metric: {
      imperial: {
        ratio: 1 / 0.453592,
      },
    },
    imperial: {
      metric: {
        ratio: 0.453592,
      },
    },
  },
};

export default measure;
