import Renderer from '../lib/renderer.mjs';
import Sim, {State} from '../lib/sim.mjs';

const LAYERS = ['life'];
const SCALE = 1;
const WIDTH = 500 / SCALE;
const HEIGHT = 300 / SCALE;

const R = new Renderer(WIDTH, HEIGHT, {scale: SCALE});
const S = new Sim(WIDTH, HEIGHT, LAYERS, R, update, {});
S.start();

R.el.addEventListener('click', (event) => {
  const rect = R.el.getBoundingClientRect();
  const x = Math.floor((event.clientX - rect.left) / R.scale);
  const y = Math.floor((event.clientY - rect.top) / R.scale);
  S.state.set(x, y, S.state.get(x, y) ? 0 : 1);
});

function countNeighbors(state, x, y) {
  // let count = 0;
  // for (let dx = -1; dx <= 1; dx++) {
  //   for (let dy = -1; dy <= 1; dy++) {
  //     if (dx === 0 && dy === 0) {
  //       continue;
  //     }
  //     count += state.get(x + dx, y + dy);
  //   }
  // }
  // return count;
  return (
    state.get(x - 1, y) +
    state.get(x + 1, y) +
    state.get(x, y + 1) +
    state.get(x, y - 1) +
    state.get(x + 1, y + 1) +
    state.get(x + 1, y - 1) +
    state.get(x - 1, y + 1) +
    state.get(x - 1, y - 1)
  );
}

function update(prevState) {
  let nextState = new State(prevState.width, prevState.height);
  for (let x = 0; x < nextState.width; x++) {
    for (let y = 0; y < nextState.height; y++) {
      const cell = prevState.get(x, y);
      const numNeighbors = countNeighbors(prevState, x, y);

      nextState.set(
        x,
        y,
        (cell === 1 && (numNeighbors === 2 || numNeighbors === 3)) ||
          (cell === 0 && numNeighbors === 3)
          ? 1
          : 0
      );
    }
  }
  return nextState;
}
