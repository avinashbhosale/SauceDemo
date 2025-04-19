# SauceDemo - Playwright Automation Tests

This project contains automated tests for SauceDemo using Playwright Javascript.

## Project Overview

The goal of this project is to validate the functionality of the SauceDemo e-commerce application by automating user flows such as login, adding products to the cart, and testing the checkout flow.

## Prerequisites

Before running the tests, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 16 or later recommended)
- [Git](https://git-scm.com/)
- [Playwright](use npm install playwright command)
- [OS]Windows

## Installation

1. Clone the repository:
   git clone https://github.com/avinashbhosale/SauceDemo.git

2. Install Playwright and required browsers:
   npx playwright install

## Running the Tests

To execute the tests locally:
npx playwright test

You can run tests in headed mode (browser UI visible):
npx playwright test --headed

Or run a specific test file:
npx playwright test tests/login.spec.js

## Generating HTML Report

After running the tests, generate and view the HTML report:
npx playwright show-report


## Project Structure

SauceDemo/
|-- pages/                # Page classes for storing the locators and actions to be performed on the page locators
|-- tests/                # Test specs
|-- playwright.config.js  # Playwright configuration
|-- package.json          # Project metadata and scripts
|-- README.md             # This file

Thank You.
