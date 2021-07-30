/* eslint-disable no-eval */
/* eslint-disable import/extensions */

import puppeteer from 'puppeteer';
import {
  login, move, prepare, timeControl,
} from './actions/index.js';
import { installMouseHelper } from './helper.js';
import { sleep, getElementByXPath, expose } from './utils.js';

(async () => {
  const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
  const page = await browser.newPage();

  await installMouseHelper(page);

  // Expose helpers
  await expose(page, [
    sleep,
    getElementByXPath,
    prepare,
  ]);

  // Chess.com
  await page.goto('https://www.chess.com/login').then(() => sleep(5));

  // Login
  await page
    .evaluate(login, JSON.stringify({
      username: 'admin@cyphr.live', password: 'Smores44!',
    }))
    .then(() => sleep(5));

  // // Explore
  // await page.goto('https://www.chess.com/explorer').then(() => sleep(5));

  // Play
  await page.goto('https://www.chess.com/play/online').then(() => sleep(1));

  // Choose time controls
  await page.evaluate(timeControl, '30 min');

  // Prepare a move
  const { from, to } = await page.evaluate(prepare, 'e2', 'e4');

  // Make the move
  await move(page, from, to);
})();
