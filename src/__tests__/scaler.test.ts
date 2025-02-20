import { configureMeasurements } from "../convert";
import allMeasures, {
  AllMeasures,
  AllMeasuresSystems,
  AllMeasuresUnits,
} from '../definitions/all';

test("Test units relevant to Scaler", () => {
  const convert = configureMeasurements<
    AllMeasures,
    AllMeasuresSystems,
    AllMeasuresUnits
  >(allMeasures);

  // NOTE(milo): There is a significant loss of precision in the conversion.
  expect(convert(1).from("kg/s").to("lb/year") / 1000000).toBeCloseTo(
    2.2046226218 * 365.25 * 24 * 60 * 60 / 1000000, 0
  );
});
