/* eslint-disable no-eval */
/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable object-curly-newline */

import path from 'path';
import puppeteer from 'puppeteer';

import config from './config.js';
import { login, move, prepare, timeControl } from './actions.js';
import { sleep, getElementByXPath, expose, bundle, __dirname } from './utils.js';

(async () => {
  // Import ChessGame
  const [{ code: ChessGame }] = await bundle(path.join(__dirname, '..', 'model', 'index.js'));

  // Setup the browser
  const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
  const page = await browser.newPage();

  // Expose helpers
  await expose(page, [sleep, getElementByXPath, prepare, ChessGame]);

  // Chess.com
  await page.goto('https://www.chess.com/login').then(() => sleep(5));

  // Login
  await page.evaluate(login, JSON.stringify(config)).then(() => sleep(5));

  // Play
  await page.goto('https://www.chess.com/play/online').then(() => sleep(1));

  // Choose time controls
  await page.evaluate(timeControl, '30 min');

  // Prepare a move
  const { from, to } = await page.evaluate(prepare, 'e2', 'e4');

  // Make the move
  await move(page, from, to);
})();
