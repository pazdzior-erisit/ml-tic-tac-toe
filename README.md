# tic tac toe ML in JS

## Table of Contents

- [About the Project](#about-the-project)
- [Demo](#demo)
- [Getting Started](#getting-started)
- [Tests](#tests)
- [Usage](#usage)

## About the Project

Project implements machine learing algorithm based on [Article](https://towardsdatascience.com/reinforcement-learning-implement-tictactoe-189582bea542) with web based UI. For better performance, training is implemented in a web worker. Training occurs after the user clicks the 'Train' button. Training happens after clicking Train button by user. he algorithm trains using a copy of itself by playing 50,000 games. The training results in a player that is not perfect, but quite proficient. By clicking 'Restart', only the game board is cleared, and the algorithm remains trained

## Demo

[Demo](https://ml-tic-tac-toe.erisit.pl/)

## Built With

- [Vite](https://github.com/vitejs/vite)
- [Preact](https://github.com/preactjs/preact)

## Getting Started

To setup project locally:

1. Clone repository and enter destination directory

2. Install dependecies

```bash
npm i
```

3. Start project locally

```bash
npm run dev
```

### Tests

To run tests:

```bash
npm test
```

### Usage

To test production build:

1. Run build command:

```bash
npm run build
```

2. Run preview command:

```bash
npm run preview
```
