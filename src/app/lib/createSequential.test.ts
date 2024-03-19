import exp from 'constants';
import { createSequentialTexts } from './createSequential';

describe('createSequentialTexts', () => {
  it('連番作成のテスト:%d一個', () => {
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

  it('連番作成のテスト:%d複数', () => {
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

  it('連番作成のテスト:stepが0', () => {
    const resultWithStep0 = createSequentialTexts('test-%d', false, {
      start: 1,
      stop: 5,
      step: 0,
    });
    expect(resultWithStep0).toEqual([]);
  });

  it('連番作成のテスト:startとstopが一致', () => {
    const resultWithStartAndStopSame = createSequentialTexts('test-%d', false, {
      start: 1,
      stop: 1,
      step: 1,
    });
    expect(resultWithStartAndStopSame).toEqual(['test-1']);
  });

  it('連番作成のテスト:startがstopより大きく、stepが正', () => {
    const resultWithStartBiggerThanStop = createSequentialTexts('test-%d', false, {
      start: 5,
      stop: 1,
      step: 1,
    });
    expect(resultWithStartBiggerThanStop).toEqual([]);
  });

  it('連番作成のテスト:startがstopより小さく、stepが負', () => {
    const resultWithStartSmallerThanStop = createSequentialTexts('test-%d', false, {
      start: 1,
      stop: 5,
      step: -1,
    });
    expect(resultWithStartSmallerThanStop).toEqual([]);
  });

  it('連番作成のテスト:startとstopと差をstepが超える', () => {
    const resultWithStepBiggerThanDifference = createSequentialTexts('test-%d', false, {
      start: 1,
      stop: 5,
      step: 10,
    });
    expect(resultWithStepBiggerThanDifference).toEqual(['test-1']);
  });
});
