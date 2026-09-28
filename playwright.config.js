// @ts-check
import { defineConfig } from '@playwright/test';
import { on } from 'events';



/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 30 *1000,
  retries: 0,
  expect : {
    timeout: 5000,
  },
  reporter : 'html',

  use: {
    actionTimeout: 10 * 1000,
    navigationTimeout: 30 * 1000,
    browserName : 'chromium',
    headless : true,
    screenshot: 'on',
    trace : 'on',
    

    
  },

  

});
module.exports = config

