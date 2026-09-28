// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { on } from 'events';



/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  retries: 1,
  timeout: 30 *1000,
  expect : {
    timeout: 5000,
  },
  reporter : 'html',
  projects : [
    {
      name : 'safari',
      use: {
        browserName : 'webkit',
        headless : false,
        screenshot: 'off',
        trace : 'on',
        //...devices['iPhone 11'],
   
      }
    },
    {
      name: 'chrome',
      use: {
        browserName : 'chromium',
        headless : false,
        screenshot: 'on',
        video: 'retain-on-failure',
        ignoreHttpsErrors:true,
        permissions:['geolocation'],
        trace : 'on',
        //viewport: {width:720,height:720}
   
      }
    }
  ]

  ,

  

});
module.exports = config

