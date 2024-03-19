import { createSequentialTexts } from './createSequential';

describe('createSequentialTexts', () => {
  it('%d * 1', () => {
    const resultWithNoPaddingStep1 = createSequentialTexts('test-%d', false, {
      start: 1,
      stop: 5,
      step: 1,
    });
    expect(resultWithNoPaddingStep1).toEqual([
      'test-1',
      'test-2',
      'test-3',
      'test-4',
      'test-5',
    ]);

    const resultWithPaddingStep2 = createSequentialTexts('test-%d', true, {
      start: 2,
      stop: 13,
      step: 2,
    });
    expect(resultWithPaddingStep2).toEqual([
      'test-02',
      'test-04',
      'test-06',
      'test-08',
      'test-10',
      'test-12',
    ]);

    const resultWithPaddingStepMinus = createSequentialTexts('test-%d', true, {
      start: 15,
      stop: 5,
      step: -3,
    });
    expect(resultWithPaddingStepMinus).toEqual([
      'test-15',
      'test-12',
      'test-09',
      'test-06',
    ]);
  });

  it('%d * >= 2', () => {
    const resultWithNoPaddingStep1 = createSequentialTexts('test-%d-%d', false, {
      start: 1,
      stop: 3,
      step: 1,
    });
    expect(resultWithNoPaddingStep1).toEqual([
      'test-1-1',
      'test-1-2',
      'test-1-3',
      'test-2-1',
      'test-2-2',
      'test-2-3',
      'test-3-1',
      'test-3-2',
      'test-3-3',
    ]);
  });

  it('step === 0', () => {
    const resultWithStep0 = createSequentialTexts('test-%d', false, {
      start: 1,
      stop: 5,
      step: 0,
    });
    expect(resultWithStep0).toEqual([]);
  });

  it('start === top', () => {
    const resultWithStartAndStopSame = createSequentialTexts('test-%d', false, {
      start: 1,
      stop: 1,
      step: 1,
    });
    expect(resultWithStartAndStopSame).toEqual(['test-1']);
  });

  it('start > stop && step > 0', () => {
    const resultWithStartBiggerThanStop = createSequentialTexts('test-%d', false, {
      start: 5,
      stop: 1,
      step: 1,
    });
    expect(resultWithStartBiggerThanStop).toEqual([]);
  });

  it('start < stop && step < 0', () => {
    const resultWithStartSmallerThanStop = createSequentialTexts('test-%d', false, {
      start: 1,
      stop: 5,
      step: -1,
    });
    expect(resultWithStartSmallerThanStop).toEqual([]);
  });

  it('abs(start - stop) < step', () => {
    const resultWithStepBiggerThanDifference = createSequentialTexts('test-%d', false, {
      start: 1,
      stop: 5,
      step: 10,
    });
    expect(resultWithStepBiggerThanDifference).toEqual(['test-1']);
  });

  it('[start,stop,step].some(isNaN)', () => {
    const startGivenNaN = createSequentialTexts('test-%d', false, {
      start: NaN,
      stop: 5,
      step: 1,
    });
    expect(startGivenNaN).toEqual([]);

    const stopGivenNaN = createSequentialTexts('test-%d', false, {
      start: 1,
      stop: NaN,
      step: 1,
    });
    expect(stopGivenNaN).toEqual([]);

    const stepGivenNaN = createSequentialTexts('test-%d', false, {
      start: 1,
      stop: 5,
      step: NaN,
    });
    expect(stepGivenNaN).toEqual([]);
  });
});
