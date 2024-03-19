import { createSequentialTexts } from './createSequential';

describe('createSequentialTexts', () => {
  it('should create an array of sequential texts', () => {
    const result = createSequentialTexts(5);
    expect(result).toEqual(['1', '2', '3', '4', '5']);
  });
});
