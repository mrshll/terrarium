import Sim from '../lib/sim.mjs';

function update(state, dt) {
  console.log(state, dt);
}

const S = new Sim(update);
S.start();
