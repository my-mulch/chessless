import puppeteer from 'puppeteer';

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
  await new Promise(_ => setTimeout(_, 3000));


  // Let's play a little
  await page.goto('https://www.chess.com/play/online')

  await page.evaluate(async () => {
    // Grab the time selector and click
    const timeSelector = document.getElementsByClassName('time-selector-button')[0]
    timeSelector.click()

    // Wait for the browser
    await new Promise(_ => setTimeout(_, 1000));

    // Select this time setting
    const timeSelection = document.evaluate(
      "//button[text()='10 min']",
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue

    timeSelection.click()

    // Wait up
    await new Promise(_ => setTimeout(_, 1000));

    // Get the play button
    const play = document.evaluate(
      "//button[contains(text(), 'Play')]",
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue

    // Kick it off!
    play.click()
  })
})();