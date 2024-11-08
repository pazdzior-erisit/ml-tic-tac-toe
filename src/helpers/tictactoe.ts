export const GAME_STATE_ENUM = {
  WON: 'WON',
  FINISHED: 'FINISHED',
  IN_PROGRESS: 'IN_PROGRESS',
} as const

export type GameState = typeof GAME_STATE_ENUM[keyof typeof GAME_STATE_ENUM];

export const WIN_BOARD_TYPE = {
  TOP: 'TOP',
  LEFT: 'LEFT',
  BOTTOM_LEFT: 'BOTTOM_LEFT',
  TOP_LEFT: 'TOP_LEFT',
} as const;

export type WinBoardType = typeof WIN_BOARD_TYPE[keyof typeof WIN_BOARD_TYPE];

export const winBoards = [
  { type: WIN_BOARD_TYPE.TOP_LEFT, board: [0, 4, 8] },
  { type: WIN_BOARD_TYPE.BOTTOM_LEFT, board: [2, 4, 6] },
  { type: WIN_BOARD_TYPE.LEFT, board: [0, 1, 2] },
  { type: WIN_BOARD_TYPE.LEFT, board: [3, 4, 5] },
  { type: WIN_BOARD_TYPE.LEFT, board: [6, 7, 8] },
  { type: WIN_BOARD_TYPE.TOP, board: [0, 3, 6] },
  { type: WIN_BOARD_TYPE.TOP, board: [1, 4, 7] },
  { type: WIN_BOARD_TYPE.TOP, board: [2, 5, 8] },
];

export class GameStateEvent extends Event {
  sign?: number;
  state: GameState;
  constructor(state: GameState, sign?: number) {
    super('gamestate');
    if (state === GAME_STATE_ENUM.WON && !sign) {
      throw new Error('sign of a winner was not found');
    }
    this.sign = sign;
    this.state = state;
  }
}

export class Game {
  board: Array<number>;
  #sign: number;
  #eventTarget: EventTarget;
  #state: GameState;

  constructor() {
    this.#eventTarget = new EventTarget();
    this.#sign = 1;
    this.board = new Array(9).fill(0);
    this.#state = GAME_STATE_ENUM.IN_PROGRESS;
  }

  reset() {
    this.#sign = 1;
    this.board = new Array(9).fill(0);
    this.#state = GAME_STATE_ENUM.IN_PROGRESS;
    this.#eventTarget.dispatchEvent(new Event('boardupdate'));
    this.#eventTarget.dispatchEvent(new GameStateEvent(GAME_STATE_ENUM.IN_PROGRESS));
  }

  onGameStateChange(listener: (event: GameStateEvent) => void) {
    this.#eventTarget.addEventListener('gamestate', listener as EventListener);
  }

  onBoardUpdate(listener: (event: Event) => void) {
    this.#eventTarget.addEventListener('boardupdate', listener);
  }

  getBoardBySign(sign: number) {
    const parsed = this.board.map((el, index) => el === sign ? index : undefined);
    return parsed.filter((el) => el !== undefined) as Array<number>;
  }

  isGameFinished(): boolean {
    return this.board.every((el) => el !== 0);
  }

  getWinnerSign(): number | undefined {
    const x = this.getBoardBySign(1);
    const o = this.getBoardBySign(-1);
    for (let i = 0; i < winBoards.length; i++) {
      if (winBoards[i].board.every((el) => x.includes((el)))) {
        return 1;
      }
      if (winBoards[i].board.every((el) => o.includes((el)))) {
        return -1;
      }
    }
  }

  checkGameState() {
    const winnerSign = this.getWinnerSign()
    if (winnerSign) {
      this.#eventTarget.dispatchEvent(new GameStateEvent(GAME_STATE_ENUM.WON, winnerSign));
      this.#state = GAME_STATE_ENUM.WON;
    }
    if (this.isGameFinished()) {
      this.#eventTarget.dispatchEvent(new GameStateEvent(GAME_STATE_ENUM.FINISHED));
      this.#state = GAME_STATE_ENUM.FINISHED;
    }
  }

  getSign() {
    return this.#sign;
  }

  turn(index: number) {
    if (this.board[index] !== 0) {
      throw new Error('given index is occupied');
    }
    if (this.#state !== GAME_STATE_ENUM.IN_PROGRESS) {
      throw new Error('game has already finished');
    }
    this.board[index] = this.#sign;
    this.#sign *= -1;
    this.checkGameState();
    this.#eventTarget.dispatchEvent(new Event('boardupdate'));
  }
}
