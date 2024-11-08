import { Player } from './player';
import { GAME_STATE_ENUM, Game, GameState } from './tictactoe';

onmessage = () => {
  const playerX = new Player(0.3);
  const playerO = new Player(0.3);
  for (let i = 0; i < 50000; i++) {
    let state: GameState = GAME_STATE_ENUM.IN_PROGRESS;
    const trainingGame = new Game();
    trainingGame.onGameStateChange((event) => {
      state = event.state;
      if (event.sign === 1) {
        playerX.feedReward(1);
        playerO.feedReward(0);
      } else if (event.sign === -1) {
        playerX.feedReward(0);
        playerO.feedReward(1);
      } else {
        playerX.feedReward(0.1);
        playerO.feedReward(0.5);
      }
    });

    do {
      const currentPlayer = trainingGame.getSign() === 1 ? playerX : playerO;
      const action = currentPlayer.chooseAction(trainingGame.board, trainingGame.getSign());
      trainingGame.turn(action);
    } while (state === GAME_STATE_ENUM.IN_PROGRESS);

    playerO.reset();
    playerX.reset();
  }

  postMessage(playerX.getPolicy());
}
