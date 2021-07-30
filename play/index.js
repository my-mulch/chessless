/* eslint-disable no-eval */
/* eslint-disable import/extensions */

import puppeteer from 'puppeteer';
import { login } from './actions/index.js';
import { installMouseHelper } from './helper.js';
import { sleep, getElementByXPath, serialize } from './utils.js';

(async () => {
  const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
  const page = await browser.newPage();

  await installMouseHelper(page);

  // Initialize helpers
  await page.evaluateOnNewDocument((functions) => {
    functions
      .map(JSON.parse)
      .map(eval)
      .map((fn) => ({ [fn.name]: fn }))
      .forEach((fnObj) => Object.assign(window, fnObj));
  }, serialize(sleep, getElementByXPath));

  // Chess.com
  await page.goto('https://www.chess.com/login').then(() => sleep(0.5));

  // Login
  await page.evaluate(login).then(() => sleep(0.5));

  // Play
  await page.goto('https://www.chess.com/play/online').then(() => sleep(0.5));

  await page.evaluate(async (timeControl) => {
    // Grab the time selector and click
    const timeSelector = document.getElementsByClassName('time-selector-button')[0];
    timeSelector.click();

    // Give the browser time
    await sleep(1);

    // Choose time length
    const timeSelection = getElementByXPath(`//button[text()='${timeControl}']`);
    timeSelection.click();
  }, '5 min');

  // await page.evaluate(async () => {
  // // If we've just finished a game, start a new one
  // const newGame = getElementByXPath("//span[text()='New Game']");
  // if (newGame) newGame.click();

  // // Waitttt
  // await new Promise((_) => setTimeout(_, 2000));

  // Grab the time selector and click
  // const timeSelector = document.getElementsByClassName('time-selector-button')[0];
  // timeSelector.click();

  // Wait for the browser
  // await sleep(1);

  // Select this time setting
  // const timeSelection = getElementByXPath("//button[text()='10 min']");
  // await sleep(1);
  // timeSelection.click();

  // // Hol up
  // await sleep(1);

  // // Get the play button and kick it off!
  // const play = getElementByXPath("//button[contains(text(), 'Play')]");
  // play.click();
  // });
  // await page.mouse.move(220, 643);
  // await new Promise(_ => setTimeout(_, 1000));
  // await page.mouse.down();
  // await new Promise(_ => setTimeout(_, 1000));
  // await page.mouse.move(220, 543);
  // await new Promise(_ => setTimeout(_, 1000));
  // await page.mouse.up();
})();
