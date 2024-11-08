import { boardToBase3, stringToUint8Array } from './stringify';

describe('Stringify', () => {
  test('boardToBase3 should result with base3 representation of board Array', async () => {
    const result = boardToBase3([1, 0, 0, 1, -1, -1, 1, -1, 1]);

    expect(result).toBe(16544);
  });

  test('stringToUint8Array should result uIntArray', async () => {
    const result = stringToUint8Array('C9ejcD0Kxz9KKQ==');

    expect(Array.from(result)).toStrictEqual([67, 57, 101, 106, 99, 68, 48, 75, 120, 122, 57, 75, 75, 81, 61, 61]);
  });
});
