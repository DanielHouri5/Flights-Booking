// Cypress configuration file for E2E tests
// This file defines the Cypress setup and allows for custom node event listeners

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    // Use this function to set up custom node event listeners for Cypress
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
