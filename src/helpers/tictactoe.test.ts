import { GAME_STATE_ENUM, Game, GameStateEvent } from './tictactoe';
import { expect } from 'expect';

describe('Tic Tac Toe game', () => {
  test('creating new instanve of game class should create new board', async () => {
    const game = new Game();
    expect(game.board).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  });

  test('calling turn should update game board', async () => {
    const game = new Game();
    game.turn(0);
    expect(game.board).toStrictEqual([1, 0, 0, 0, 0, 0, 0, 0, 0]);
  });

  test('game state listener should be called after game has finished', async () => {
    const game = new Game();
    const listener = jest.fn();
    game.onGameStateChange(listener);
    game.turn(0);
    game.turn(1);
    game.turn(3);
    game.turn(6);
    game.turn(2);
    game.turn(5);
    game.turn(4);
    game.turn(7);
    game.turn(8);
    expect(listener).toBeCalledWith(new GameStateEvent(GAME_STATE_ENUM.FINISHED));
  });

  test('listener should be called after player wins the game', async () => {
    const game = new Game();
    const listener = jest.fn();
    game.onGameStateChange(listener);
    game.turn(0);
    game.turn(1);
    game.turn(3);
    game.turn(2);
    game.turn(6);
    expect(listener).toBeCalledWith(new GameStateEvent(GAME_STATE_ENUM.WON, 1));
  });

  test('turn function should result with board update event', async () => {
    const game = new Game();
    const listener = jest.fn();
    game.onBoardUpdate(listener);
    game.turn(0);
    expect(listener).toBeCalled()
  });

  test('calling turn function after game finish should throw error', async () => {
    const game = new Game();
    const listener = jest.fn();
    game.onGameStateChange(listener);
    game.turn(0);
    game.turn(1);
    game.turn(3);
    game.turn(2);
    game.turn(6);
    expect(() => game.turn(8)).toThrowError(new Error('game has already finished'));
  });

  test('calling turn function with occupied index should throw error', async () => {
    const game = new Game();
    const listener = jest.fn();
    game.onGameStateChange(listener);
    game.turn(0);
    expect(() => game.turn(0)).toThrowError(new Error('given index is occupied'));
  });

  test('get sign should result with current sign value', async () => {
    const game = new Game();
    const listener = jest.fn();
    game.onGameStateChange(listener);
    game.turn(0);
    expect(game.getSign()).toBe(-1);
  });

  test('reset should rest game state to initial', async () => {
    const game = new Game();
    game.turn(0);
    game.reset();
    expect(game.board).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  });

  test('reset should call onBoardUpdate with inital board', async () => {
    const game = new Game();
    game.turn(0);
    const listener = jest.fn();
    game.onBoardUpdate(listener);
    game.reset();
    expect(listener).toBeCalled();
  });

  test('reset should call onGameStateChange with inital state', async () => {
    const game = new Game();
    game.turn(0);
    const listener = jest.fn();
    game.onGameStateChange(listener);
    game.reset();
    expect(listener).toBeCalledWith(new GameStateEvent(GAME_STATE_ENUM.IN_PROGRESS));
  });

  test('when player wins after last turn of the game onGameStateChange should result with WON', async () => {
    const game = new Game();
    const listener = jest.fn();
    game.onGameStateChange(listener);
    game.turn(0);
    game.turn(1);
    game.turn(4);
    game.turn(2);
    game.turn(5);
    game.turn(3);
    game.turn(7);
    game.turn(6);
    game.turn(8);
    expect(listener).toBeCalledWith(new GameStateEvent(GAME_STATE_ENUM.WON, 1));
  });
});
