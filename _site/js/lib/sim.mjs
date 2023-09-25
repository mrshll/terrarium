import Renderer from './renderer.mjs';

export default class Sim {
  width;
  height;
  speed = 1;
  layers;
  isPaused = false;

  #clock = 0.0;

  /**
   * @type {Renderer}
   */
  renderer;

  /**
   * @type {State}
   */
  state;

  /**
   *
   * @param {string[]} layers
   * @param {*} update
   * @param {*} options
   */
  constructor(width, height, layers, renderer, update, options) {
    this.width = width;
    this.height = height;
    this.renderer = renderer;
    this.update = update;
    this.isPaused = false;

    if (!layers || !layers.length) {
      throw new Error('Layers required');
    }
    this.layers = layers;

    for (const key in options) {
      if (Object.hasOwnProperty.call(this, key)) {
        this[key] = options[key];
      }
    }

    this.state = new State(width, height);
  }

  start() {
    this.renderer.start();
    this.tick();
    window.addEventListener('keydown', (e) => {
      if (e.key === ' ') {
        this.isPaused = !this.isPaused;
      }
    });
  }

  tick() {
    if (!this.isPaused) {
      this.state = this.update(this.state);
    }
    this.renderer.render(this.state);
    requestAnimationFrame(() => this.tick());
  }
}

export class State {
  width;
  height;
  #state = [];

  constructor(width, height) {
    this.width = width;
    this.height = height;
    for (let x = 0; x < width; x++) {
      this.#state[x] = [];
      for (let y = 0; y < height; y++) {
        this.#state[x].push(Math.random() > 0.5 ? 1 : 0);
      }
    }
  }

  get(x, y) {
    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
      return this.#state[x][y];
    }
    return 0;
  }

  set(x, y, val) {
    this.#state[x][y] = val;
  }
}
