import puppeteer from 'puppeteer';
import { getElementByXPath, sleep } from './utils.js';

(async () => {
  // Launch the browser
  const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
  const page = await browser.newPage();

  // Enable console.log in evaluate fn
  page.on('console', consoleObj => console.log(consoleObj.text()));

  // Head to the login page
  await page.goto('https://www.chess.com/login_and_go');

  // Let yourself in
  await page.evaluate(() => {
    const login = document.getElementById('login')
    const username = document.getElementById('username')
    const password = document.getElementById('password')

    username.value = 'admin@cyphr.live'
    password.value = 'Smores44!'

    login.click()
  });

  // Sleep for a sec, give the browser some time
  await new Promise(_ => setTimeout(_, 1000));

  // Let's play a little
  await page.goto('https://www.chess.com/play/online')

  await page.evaluate(async () => {
    // Utility for button selection
    function getElementByXPath(xpath) {
      return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
    }

    // Grab the time selector and click
    const timeSelector = document.getElementsByClassName('time-selector-button')[0]
    timeSelector.click()

    // Wait for the browser
    await new Promise(_ => setTimeout(_, 1000));

    // Select this time setting
    const timeSelection = getElementByXPath("//button[text()='10 min']")
    timeSelection.click()

    // Hol up
    await new Promise(_ => setTimeout(_, 1000));

    // Get the play button and kick it off!
    const play = getElementByXPath("//button[contains(text(), 'Play')]")
    play.click()
  })

  await page.evaluate(() => {
    const board = Array.from(document.getElementsByClassName('board')).pop()
    const screen = Array.from(document.getElementsByClassName('user-logged-in')).pop()

    const sample = Array.from(document.getElementsByClassName('square-0101')).pop()
    const { width: nextFile, height: nextRank } = sample.getBoundingClientRect()
  })
})();
