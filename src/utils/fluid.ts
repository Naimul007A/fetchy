/**
 * Fluid Typography and Spacing Utility
 *
 * This utility provides fluid scaling for typography and spacing that works with Tailwind CSS v4.
 * It serves as a replacement for the Tailwind Fluid plugin, implementing responsive
 * fluid scaling using CSS custom properties and calculations.
 */


type RawValue = string | null | undefined;

// Please refer to MDN when updating this list:
// https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units
// Only need to check for ones that could also be valid media/container queries (i.e. no vw, cqw)
const lengthUnits = [
  "cm",
  "mm",
  "Q",
  "in",
  "pc",
  "pt",
  "px",
  "em",
  "ex",
  "ch",
  "rem",
  "lh",
  "rlh",
];
// Ripped from Tailwind:
// https://github.com/tailwindlabs/tailwindcss/blob/master/src/util/dataTypes.js
const lengthRegExp = new RegExp(
  `^\s*([+-]?[0-9]*\.?[0-9]+(?:[eE][+-]?[0-9]+)?)(${lengthUnits.join("|")})\s*$`
);
class Length {
  constructor(public number: number, public unit?: string) {}
  get cssText() {
    return `${this.number}${this.unit ?? ""}`;
  }
  static parse(raw: unknown) {
    if (raw === 0) return new this(0);
    if (typeof raw !== "string") return null;
    if (parseFloat(raw) === 0) return new this(0);

    const match = raw.match(lengthRegExp);
    const number = parseFloat(match?.[1] ?? "");
    return isNaN(number) ? null : new this(number, match?.[2]);
  }
}

const toPrecision = (num: number, precision: number) => {
  const formatters: Record<number, Intl.NumberFormat> = {};
  return (formatters[precision] ??= new Intl.NumberFormat("en-US", {
    maximumFractionDigits: precision,
    useGrouping: false,
  })).format(num);
};

const precision = (num: number) => {
  if (Math.floor(num.valueOf()) === num.valueOf()) return 0;
  return num.toString().split(".")?.[1]?.length || 0;
};

const normalizeLength = (val: RawValue | Length) => {
  if (val instanceof Length) return val;
  const len = Length.parse(val);
  if (!len) return null;
  return len;
};

export const fluid = (
  min: RawValue | Length,
  max: RawValue | Length,
  {
    minVW = "40rem",
    maxVW = "96rem",
  }: {
    minVW?: RawValue | Length;
    maxVW?: RawValue | Length;
  } = {}
) => {
  const minSize = normalizeLength(min);
  const maxSize = normalizeLength(max);
  if (!minSize || !maxSize) return null;
  const minViewport = normalizeLength(minVW);
  const maxViewport = normalizeLength(maxVW);

  if (minSize.number === 0) minSize.unit = maxSize.unit;
  else if (maxSize.number === 0) maxSize.unit = minSize.unit;
  else if (!minSize.unit || minSize.unit !== maxSize.unit) return null;
  const unit = minSize.unit;

  if (minSize.number === maxSize.number) return `${minSize.number}${unit}`;

  if (!minViewport || !maxViewport) return null;
  if (minViewport.number === 0) {
    minViewport.unit = maxViewport.unit;
  } else if (maxViewport.number === 0) {
    maxViewport.unit = minViewport.unit;
  } else if (!minViewport.unit || minViewport.unit !== maxViewport.unit) {
    return;
  }

  if (minViewport.number === maxViewport.number) {
    return `${minSize.number}${unit}`;
  }

  if (minSize.unit !== minViewport.unit) {
    return null;
  }

  const p = Math.max(
    precision(minSize.number),
    precision(minViewport.number),
    precision(maxSize.number),
    precision(maxViewport.number),
    2
  );

  const finalMin = `${Math.min(minSize.number, maxSize.number)}${unit}`; // CSS requires the min < max in a clamp
  const finalMax = `${Math.max(minSize.number, maxSize.number)}${unit}`; // CSS requires the min < max in a clamp
  const slope =
    (maxSize.number - minSize.number) /
    (maxViewport.number - minViewport.number);
  const intercept = minSize.number - minViewport.number * slope;

  return `clamp(${finalMin}, ${toPrecision(
    intercept,
    p
  )}${unit} + ${toPrecision(slope * 100, p)}vw, ${finalMax})`;
};
