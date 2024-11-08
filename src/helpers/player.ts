import { StatesValues } from './statesValues';
import { boardToBase3 } from './stringify';


export class Player {
  lr = 0.2;
  expRate: number;
  decayGamma = 0.9;
  states: Array<number>;
  statesValue: StatesValues;

  constructor(expRate: number) {
    this.expRate = expRate;
    this.states = [];
    this.statesValue = new StatesValues();
  }

  getPolicy(): string {
    return this.statesValue.serialize();
  }

  setPolicy(value: string) {
    this.statesValue.deserialize(value);
  }

  reset() {
    this.states = [];
  }

  getAvailablePositions(board: Array<number>) {
    return board.map((el, index) => el === 0 ? index : undefined).filter((el) => el !== undefined) as Array<number>;
  }

  getRandomIndex(board: Array<number>) {
    const choices = this.getAvailablePositions(board);
    const choice = choices[Math.floor(Math.random() * choices.length)];
    return choice;
  }

  getValue(hash: number) {
    return this.statesValue.get(hash) || 0;
  }

  feedReward(reward: number) {
    const reversed = [...this.states].reverse();
    const parsedStatesValue = this.calculateStatesValue(reversed, reward);
    this.statesValue.merge(new Map(parsedStatesValue.state));
  }

  calculateStatesValue(states: Array<number>, reward: number) {
    return states.reduce<{ value: number, state: Array<[number, number]> }>((acc, el) => {
      const value = this.statesValue.get(el) || 0;
      const calculated = value + this.lr * (this.decayGamma * acc.value - value);
      return { value: calculated, state: [...acc.state, [el, calculated]] };
    }, { value: reward, state: [] });
  }

  chooseActionByStatesValue(board: Array<number>, sign: number) {
    const positions = this.getAvailablePositions(board);
    const choice = this.getActionWithHighestValue(positions, board, sign);
    return choice.action;
  }

  getActionWithHighestValue(positions: Array<number>, board: Array<number>, sign: number) {
    return positions.reduce<{ action: number, max: number }>((acc, el) => {
      const newBoard = [...board];
      newBoard[el] = sign;
      const newBoardHash = boardToBase3(newBoard);
      const value = this.getValue(newBoardHash);
      if (value >= acc.max) {
        return { max: value, action: el };
      }
      return acc;
    }, { max: -999, action: positions[0] });
  }

  getAction(board: Array<number>, sign: number) {
    if (Math.random() <= this.expRate) {
      return this.getRandomIndex(board);
    }
    return this.chooseActionByStatesValue(board, sign);
  }

  chooseAction(board: Array<number>, sign: number) {
    const action = this.getAction(board, sign);
    const newBoard = [...board];
    newBoard[action] = sign;
    this.states.push(boardToBase3(newBoard));
    return action;
  }
}
