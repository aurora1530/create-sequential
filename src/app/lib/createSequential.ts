/**
 * Generates an array of numbers within a specified range.
 *
 * @param start - The starting number of the range (inclusive).
 * @param stop - The ending number of the range (inclusive).
 * @param step - The step value between each number in the range. if 0 is passed, an empty array is returned.
 * @returns An array of numbers within the specified range.
 */
const range = (start: number, stop: number, step: number): number[] => {
  if (step === 0) return [];
  return Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
};

type rangeConf = {
  start?: number;
  stop: number;
  step?: number;
};

/**
 * @param format format of the serial number. %d is the placeholder for the number.
 * @param start start of the range
 * @param stop end of the range
 * @param step step of the range
 * @returns array of strings.
 * @example createSequentialTexts('IMG-%d-%d', { stop: 2 }) =>
 * ['IMG-1-1', 'IMG-1-2', 'IMG-2-1', 'IMG-2-2']
 */
export const createSequentialTexts = (
  format: string,
  { start = 1, stop, step = 1 }: rangeConf
): string[] => {
  const placeholderCount = (format.match(/%d/g) || []).length;
  const serialNumbers = range(start, stop, step);

  return serialNumbers.flatMap((num) => {
    const replacedFirstPart = format.replace(/%d/, num.toString());
    if (placeholderCount > 1) {
      return createSequentialTexts(replacedFirstPart, { start, stop, step });
    }
    return replacedFirstPart;
  });
};
