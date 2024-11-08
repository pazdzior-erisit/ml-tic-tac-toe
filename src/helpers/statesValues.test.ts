import { StatesValues } from './statesValues';

describe('StatesValues', () => {
  test('serialize should result with serialized states values', async () => {
    const statesValues = new StatesValues();
    statesValues.set(0, 0.1);
    statesValues.set(666, 0.2);
    expect(statesValues.serialize()).toBe(`mpmZmZmZuT+amZmZmZnJPwAAmgI=\n16`);
  });

  test('deserialize should set values to result of deserialization', async () => {
    const statesValues = new StatesValues();
    statesValues.deserialize('mpmZmZmZuT+amZmZmZnJPwAAmgI=\n16');
    expect(Array.from(statesValues)).toStrictEqual([[0, 0.1], [666, 0.2]]);
  });
});
