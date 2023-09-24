import {h, Component, render} from '../static/preact.mjs';

// Create your app
const app = h('h1', null, 'Hello World!');

render(app, document.getElementById('foo'));
