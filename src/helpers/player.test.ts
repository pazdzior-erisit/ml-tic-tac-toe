import { Player } from './player';
import { expect } from 'expect';
import { boardToBase3 } from './stringify';

describe('Player', () => {
  test('choose action should always result with random index of given board when expRate is equal 1', async () => {
    const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    const player = new Player(1);
    expect(player.chooseAction(board, 1)).toBeGreaterThanOrEqual(0);
    expect(player.chooseAction(board, 1)).toBeLessThanOrEqual(8);
  });

  test('choose action should always result with not occupiad index of given board when expRate is equal 1', async () => {
    const board = [1, 1, 1, 1, 1, 1, 1, 0, 1];
    const player = new Player(1);
    expect(player.chooseAction(board, 1)).toBe(7);
  });

  test('choose action should result with index corresponding with greatest sate value ', async () => {
    const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    const player = new Player(0);
    player.statesValue.set(boardToBase3([0, 0, 1, 0, 0, 0, 0, 0, 0]), 1);
    expect(player.chooseAction(board, 1)).toBe(2);
  });

  test('feed forword should result with updated states value', async () => {
    const player = new Player(0);
    player.states = [boardToBase3([0, 0, 1, 0, 0, 0, 0, 0, 0]), boardToBase3([0, 0, 1, -1, 0, 0, 0, 0, 0])];
    player.feedReward(1);
    expect(Array.from(player.statesValue)).toStrictEqual([
      [boardToBase3([0, 0, 1, -1, 0, 0, 0, 0, 0]), 0.18000000000000002],
      [boardToBase3([0, 0, 1, 0, 0, 0, 0, 0, 0]), 0.032400000000000005]
    ]);
  });

  test('reset should set states as empty array', async () => {
    const player = new Player(0);
    player.states = [boardToBase3([0, 0, 1, 0, 0, 0, 0, 0, 0]), boardToBase3([0, 0, 1, -1, 0, 0, 0, 0, 0])];
    player.reset();
    expect(player.states).toStrictEqual([]);
  });

  test('getPolicy should result with stringified states values', async () => {
    const player = new Player(0);
    player.states = [boardToBase3([0, 0, 1, 0, 0, 0, 0, 0, 0]), boardToBase3([0, 0, 1, -1, 0, 0, 0, 0, 0])];
    player.feedReward(1);
    expect(player.getPolicy()).toBe(`C9ejcD0Kxz+D4seYu5agP1coSik=\n16`);
  });

  test('setPolicy should result with parsed state values', async () => {
    const player = new Player(0);
    player.setPolicy('C9ejcD0Kxz+D4seYu5agP1coSik=\n16');
    expect(Array.from(player.statesValue)).toStrictEqual([[10327, 0.18000000000000002], [10570, 0.032400000000000005]]);
  });
});
