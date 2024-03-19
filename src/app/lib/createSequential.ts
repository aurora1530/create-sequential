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

type paddingConf = { shouldPad: false } | { shouldPad: true; paddingText: string };

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
  paddingConf: paddingConf,
  { start = 1, stop, step = 1 }: rangeConf
): string[] => {
  const placeholderCount = (format.match(/%d/g) || []).length;
  const serialNumbers = range(start, stop, step);
  const maxNumLength = Math.max(...serialNumbers).toString().length;

  return serialNumbers.flatMap((num) => {
    const padding = paddingConf.shouldPad
      ? paddingConf.paddingText.repeat(maxNumLength - num.toString().length)
      : '';
    const replacedFirstPart = format.replace(/%d/, padding + num.toString());
    if (placeholderCount > 1) {
      return createSequentialTexts(replacedFirstPart, paddingConf, { start, stop, step });
    }
    return replacedFirstPart;
  });
};
