import { getElementByXPath, sleep } from '../utils';

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
  // Grab the time selector and click
  const timeSelector = document.getElementsByClassName('time-selector-button')[0];
  timeSelector.click();

  // Give the browser time
  await sleep(1);

  // Choose time length
  const timeSelection = getElementByXPath(`//button[text()='${control}']`);
  timeSelection.click();
}
