const TABULEIRO_SIZE = 8;

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const getValidMoves = position => {
  const [x, y] = position;
  const validMoves = [
    [x + 2, y + 1],
    [x + 2, y - 1],
    [x - 2, y + 1],
    [x - 2, y - 1],
    [x + 1, y + 2],
    [x + 1, y - 2],
    [x - 1, y + 2],
    [x - 1, y - 2],
  ];
  return validMoves.filter(
    ([x, y]) => x >= 0 && x < TABULEIRO_SIZE && y >= 0 && y < TABULEIRO_SIZE
  );
};

const move = async state => {
  const validMoves = getValidMoves(state.cavalo_position);

  await sleep(1000);

  if (validMoves.length === 0) {
    return;
  }

  for (const m of validMoves) {
    if (state.tabuleiro[m[0]][m[1]] !== -1) {
      continue;
    }

    state.round++;
    state.cavalo_position = m;
    state.tabuleiro[m[0]][m[1]] = state.round;

    console.clear();
    console.table(state.tabuleiro);

    move(state);
  }
};

const run = () => {
  let state = {
    tabuleiro: Array.from({ length: TABULEIRO_SIZE }, () =>
      Array(TABULEIRO_SIZE).fill(-1)
    ),
    round: 0,
    cavalo_position: [0, 0],
  };

  state.tabuleiro[0][0] = 0;

  move(state);

  console.clear();
  console.table(state.tabuleiro);
};

run();
