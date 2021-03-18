#!/usr/bin/env python
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

driver = webdriver.Chrome("./chromedriver")

# Hit the site
driver.get("https://www.chess.com/login_and_go")

# Grab the fields
login = driver.find_element_by_id("login")
username = driver.find_element_by_id("username")
password = driver.find_element_by_id("password")

# Type the info
username.send_keys("admin@cyphr.live")
password.send_keys("Smores44!")

# Login
login.click()
time.sleep(5)

# Head to play area
driver.get("https://www.chess.com/play/online")

# Setup a new game
new_game = driver.find_element_by_xpath("//*[contains(text(), 'New Game')]")
new_game.click()

# Choose time control
time_select = driver.find_element_by_class_name("time-selector-button")
time_select.click()

time_control = driver.find_element_by_xpath("//*[contains(text(), '10 min')]")
time_control.click()