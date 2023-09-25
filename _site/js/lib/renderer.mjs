export default class Renderer {
  width;
  height;
  scale;

  el;
  context;

  constructor(width, height, options) {
    this.width = width;
    this.height = height;
    this.scale = options.scale || 1;

    for (const key in options) {
      if (Object.hasOwnProperty.call(this, key)) {
        this[key] = options[key];
      }
    }
  }

  start() {
    const canvas = document.createElement('canvas');
    canvas.style['position'] = 'absolute';
    document.body.appendChild(canvas);
    this.el = canvas;
    this.context = canvas.getContext('2d');
    this.resize();
  }

  resize() {
    const {canvas} = this.context;
    canvas.width = this.width;
    canvas.height = this.height;
    this.el.style['width'] = `${this.width * this.scale}px`;
    this.el.style['height'] = `${this.height * this.scale}px`;
    this.el.style['imageRendering'] = 'pixelated';
  }

  render(state) {
    this.context.clearRect(0, 0, this.width, this.height);

    const pixels = this.context.createImageData(this.width, this.height);
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        const color = state.get(x, y) === 1 ? 0 : 255;
        const pos = y * this.width * 4 + x * 4;
        pixels.data[pos + 0] = color;
        pixels.data[pos + 1] = color;
        pixels.data[pos + 2] = color;
        pixels.data[pos + 3] = 255;
      }
    }
    this.context.putImageData(pixels, 0, 0);
  }
}
