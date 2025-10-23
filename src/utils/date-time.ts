import DateTimeRange from '../types/date-time-range';

export const addHours = (b: Date, h: number) =>
  new Date(b.getTime() + h * 60 * 60 * 1000);

export const addMinutes = (b: Date, m: number) =>
  new Date(b.getTime() + m * 60 * 1000);

export const addSeconds = (b: Date, s: number) =>
  new Date(b.getTime() + s * 1000);

export const addMillis = (b: Date, ms: number) => new Date(b.getTime() + ms);

export const addDays = (b: Date, d: number) =>
  new Date(b.getTime() + d * 24 * 60 * 60 * 1000);

export const subtractHours = (b: Date, h: number) =>
  new Date(b.getTime() - h * 60 * 60 * 1000);

export const subtractMinutes = (b: Date, m: number) =>
  new Date(b.getTime() - m * 60 * 1000);

export const subtractSeconds = (b: Date, s: number) =>
  new Date(b.getTime() - s * 1000);

export const subtractMillis = (b: Date, ms: number) =>
  new Date(b.getTime() - ms);

export const subtractDays = (b: Date, d: number) =>
  new Date(b.getTime() - d * 24 * 60 * 60 * 1000);

/** @returns: 1 if DateTimeRanges do not overlap, and 0 if they do */
export const verifyNoConflict = (a: DateTimeRange, b: DateTimeRange) => {
  if (
    a.startDate.getTime() > b.startDate.getTime() &&
    a.startDate.getTime() < b.endDate.getTime()
  ) {
    return 0;
  }
  if (
    a.endDate.getTime() > b.startDate.getTime() &&
    a.endDate.getTime() < b.endDate.getTime()
  ) {
    return 0;
  }
  return 1;
};

/** @returns: true if requested DateTimeRange fits within the availability DateTimeRange, and false if it does not */
export const verifyAvailable = (
  availability: DateTimeRange,
  requestedTime: DateTimeRange,
) => {
  return !(
    availability.startDate.getTime() > requestedTime.startDate.getTime() ||
    availability.startDate.getTime() > requestedTime.endDate.getTime() ||
    availability.endDate.getTime() < requestedTime.endDate.getTime() ||
    availability.endDate.getTime() < requestedTime.startDate.getTime()
  );
};
