import 'bootstrap/dist/css/bootstrap.min.css'; // <-- import bootstrap stylesheets
import React from 'react';
import { render } from 'react-dom';
import App from './ui/index';

document.addEventListener('DOMContentLoaded', () => {
  document.body.insertAdjacentHTML('beforeend', '<div id="app" class="m-5"></div>');
  render(<App />, document.getElementById('app'));
});
