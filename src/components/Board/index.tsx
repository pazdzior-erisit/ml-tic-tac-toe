import clsx from 'clsx';
import styles from './styles.module.css';
import XIcon from '../../assets/XIcon';
import OIcon from '../../assets/OIcon';
import { GameState, WIN_BOARD_TYPE, WinBoardType, winBoards } from '../../helpers/tictactoe';
import { useEffect, useState } from 'preact/hooks';

type Props = {
  class?: string,
  board: Array<number>,
  state: GameState,
  onClick: (index: number) => void,
}

const winBordStylesConfig = {
  [WIN_BOARD_TYPE.TOP]: styles.top,
  [WIN_BOARD_TYPE.LEFT]: styles.left,
  [WIN_BOARD_TYPE.BOTTOM_LEFT]: styles.bottomLeft,
  [WIN_BOARD_TYPE.TOP_LEFT]: styles.topLeft,
};

const Board = (props: Props) => {
  const [winBoard, setWinBoard] = useState<{ type: WinBoardType, board: Array<number>}>();
  const handleClick = (index: number) => () => {
    props.onClick(index);
  }

  const getWinBoardStyles = (index: number) => {
    if (!winBoard) {
      return;
    }
    if (!winBoard.board.some((el) => el === index)) {
      return;
    }
    return winBordStylesConfig[winBoard.type];
  };

  useEffect(() => {
    const indexes = winBoards.find((el) => {
      const parsed = el.board.map((item) => props.board[item]);
      return parsed[0] && parsed.every((item) => item === parsed[0]);
    });

    setWinBoard(indexes);
  }, [props.board]);


  return (
    <div class={clsx(styles.wrapper, props.class)}>
      {props.board.map((cell, index) => (
        <button class={clsx(styles.cell, getWinBoardStyles(index))} key={`board-cell-${index}`} onClick={handleClick(index)}>
          {cell === -1 && (
            <OIcon/>
          )}
          {cell === 1 && (
            <XIcon/>
          )}
        </button>
      ))}
    </div>
  );
};

export default Board;
