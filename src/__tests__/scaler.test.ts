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
  expect(convert(1).from("kg/s").to("lb/a") / 1000000).toBeCloseTo(
    2.2046226218 * 365.25 * 24 * 60 * 60 / 1000000, 0
  );

  // Make sure metric ton conversions are correct.
  expect(convert(1).from("mt/s").to("kg/s")).toBeCloseTo(1000);
  expect(convert(1).from("mt/s").to("lb/s")).toBeCloseTo(1000 * 2.2046226218);

  expect(convert(1).from("mt/d").to("kg/s")).toBeCloseTo(1000 / 86400);
  expect(convert(1).from("mt/d").to("lb/s")).toBeCloseTo(1000 * 2.2046226218 / 86400);

  expect(convert(1).from("mt/h").to("kg/s")).toBeCloseTo(1000 / 3600);
  expect(convert(1).from("mt/h").to("lb/s")).toBeCloseTo(1000 * 2.2046226218 / 3600);

  expect(convert(1).from("mt/min").to("kg/s")).toBeCloseTo(1000 / 60);
  expect(convert(1).from("mt/min").to("lb/s")).toBeCloseTo(1000 * 2.2046226218 / 60);

  expect(convert(1).from("mt/w").to("kg/s")).toBeCloseTo(1000 / 604800);
  expect(convert(1).from("mt/w").to("lb/s")).toBeCloseTo(1000 * 2.2046226218 / 604800);

  expect(convert(1).from("mt/a").to("kg/s")).toBeCloseTo(1000 / 31536000);
  expect(convert(1).from("mt/a").to("lb/s")).toBeCloseTo(1000 * 2.2046226218 / 31536000);

  // Make sure cubic meter conversions are correct.
  expect(convert(1).from("m3/s").to("l/s")).toBeCloseTo(1000);
  expect(convert(1).from("m3/d").to("l/s")).toBeCloseTo(1000 / 86400);
  expect(convert(1).from("m3/h").to("l/s")).toBeCloseTo(1000 / 3600);
  expect(convert(1).from("m3/min").to("l/s")).toBeCloseTo(1000 / 60);
  expect(convert(1).from("m3/w").to("l/s")).toBeCloseTo(1000 / 604800);
  expect(convert(1).from("m3/a").to("l/s")).toBeCloseTo(1000 / 31536000);

  expect(convert(1).from("m3/s").to("kl/s")).toBeCloseTo(1);
  expect(convert(1).from("m3/d").to("kl/s")).toBeCloseTo(1 / 86400);
  expect(convert(1).from("m3/h").to("kl/s")).toBeCloseTo(1 / 3600);
  expect(convert(1).from("m3/min").to("kl/s")).toBeCloseTo(1 / 60);
  expect(convert(1).from("m3/w").to("kl/s")).toBeCloseTo(1 / 604800);
  expect(convert(1).from("m3/a").to("kl/s")).toBeCloseTo(1 / 31536000);
});
