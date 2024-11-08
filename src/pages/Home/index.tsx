import clsx from 'clsx';
import styles from './styles.module.css';
import Board from '../../components/Board';
import { useEffect, useRef, useState } from 'preact/hooks';
import { GAME_STATE_ENUM, Game, GameState, GameStateEvent } from '../../helpers/tictactoe';
import { Player } from '../../helpers/player';
import workerUrl from '../../helpers/train?worker&url';
import Controls from '../../components/Controls';
import Loader from '../../components/Loader';

type Props = {
  class?: string,
}

const Home = (props: Props) => {
  const game = useRef<Game>(new Game());
  const player = useRef<Player>(new Player(0.1));
  const worker = useRef<Worker>();
  const [loading, setLoading] = useState<boolean>();
  const [winner, setWinner] = useState<number>();
  const [gameState, setGameState] = useState<GameState>(GAME_STATE_ENUM.IN_PROGRESS);
  const [board, setBoard] = useState<Array<number>>([]);

  const handleReset = () => {
    setWinner(undefined);
    game.current.reset();
    player.current.reset();
  };

  const handleTrain = async () => {
    if (!worker.current) {
      throw new Error('worker not found');
    }

    setLoading(true);
    worker.current.postMessage('train');
  }

  useEffect(() => {
    player.current = new Player(0.1);
    const setupGame = () => {
      game.current = new Game();
      setBoard(game.current.board);
      game.current.onGameStateChange((event: GameStateEvent) => {
        if (event.state === GAME_STATE_ENUM.WON) {
          setWinner(event.sign);
        }
        setGameState(event.state);
      })

      game.current.onBoardUpdate(() => {
        setBoard([...game.current.board]);
        setTimeout(() => {
          if (game.current.getSign() === 1) {
            const action = player.current.chooseAction(game.current.board, 1);
            game.current.turn(action);
          }
        }, 200);

      })

      const action = player.current.chooseAction(game.current.board, 1);
      game.current.turn(action);
    }

    const setupWorker = () => {
      worker.current = new Worker(workerUrl, { type: 'module' });
      if (!worker.current) {
        throw new Error('worker not initilied');
      }
      worker.current.onmessage = (ev) => {
        player.current.setPolicy(ev.data);
        handleReset();
        setLoading(false);
      }
    };

    setupWorker();
    setupGame();

  }, []);

  const handleClick = (index: number) => {
    if (game.current.getSign() === -1) {
      game.current.turn(index)
    }
  };

  return (
    <div class={clsx(styles.wrapper, props.class)}>
      {loading && (
        <div class={styles.overlay}>
          <Loader class={styles.loader}/>
        </div>
      )}
      <Controls onReset={handleReset} onTrain={handleTrain}/>
      <div class={styles.result}>
        {!winner && gameState === GAME_STATE_ENUM.FINISHED && (
          <div>Draw</div>
        )}
        {winner === 1 && (
          <div>You lose</div>
        )}
        {winner === -1 && (
          <div>You won</div>
        )}
      </div>
      <div class={styles.body}>
        <Board onClick={handleClick} state={gameState} board={board}/>
      </div>
    </div>
  );
};

export default Home;
