/* eslint-disable object-curly-newline */
/* eslint-disable import/extensions */
import { getElementByXPath, sleep } from './utils.js';

export async function login(credentials) {
  const { username, password } = JSON.parse(credentials);

  const button = document.getElementById('login');
  const userInput = document.getElementById('username');
  const passInput = document.getElementById('password');

  userInput.value = username;
  passInput.value = password;

  button.click();
}

export async function timeControl(control) {
  // If we just finished a game, we start another in this fashion
  const newGame = getElementByXPath("//span[text()='New Game']");
  if (newGame) newGame.click();

  // Grab the time selector and click
  const [timeSelector] = document.getElementsByClassName('time-selector-button');
  timeSelector.click();

  // Give the browser time
  await sleep(1);

  // Choose time length
  const timeSelection = getElementByXPath(`//button[text()='${control}']`);
  timeSelection.click();
}

export async function prepare(from, to) {
  // Get the ranks and files
  const ranksAndFiles = Array.from(document.getElementsByTagName('text'));
  const ranks = ranksAndFiles.slice(0, 8);
  const files = ranksAndFiles.slice(-8);

  // Go find the square coordinates for the given move
  const { x: fx } = files.find((file) => file.innerHTML === from[0]).getBoundingClientRect();
  const { y: fy } = ranks.find((rank) => rank.innerHTML === from[1]).getBoundingClientRect();

  const { x: tx } = files.find((file) => file.innerHTML === to[0]).getBoundingClientRect();
  const { y: ty } = ranks.find((rank) => rank.innerHTML === to[1]).getBoundingClientRect();

  // Return the move coordinates
  return { from: [fx, fy], to: [tx, ty] };
}

export function start() {
  const button = getElementByXPath("//button[contains(text(), 'Play')]");
  button.click();
}

export async function move(page, from, to) {
  await page.mouse.move(...from);
  await page.mouse.down();
  await page.mouse.move(...to);
  await page.mouse.up();
}
