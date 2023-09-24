export default class Sim {
  width = 8;
  height = 6;
  speed = 1;
  isPaused = false;

  #clock = 0.0;
  #state;

  constructor(update, options) {
    this.update = update;

    for (const key in options) {
      if (Object.hasOwnProperty.call(this, key)) {
        this[key] = options[key];
      }
    }

    this.#state = [...Array(this.width)].map((_) => Array(this.height));

    if (document.body === null) {
      addEventListener('load', () => {
        requestAnimationFrame(() => this.start());
      });
    } else {
      requestAnimationFrame(() => this.start());
    }
  }

  start() {
    this.tick();
  }

  tick(dt) {
    this.#clock += this.speed;
    while (this.#clock > 0) {
      if (!this.isPaused) {
        this.update(this.#state, dt);
      }
      this.tick(dt);
      this.#clock--;
    }

    requestAnimationFrame((dt) => this.tick(dt));
  }
}
