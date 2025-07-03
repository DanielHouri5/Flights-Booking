// Jest setup file for the Frontend project
// This file configures the testing environment before each test run

// Add custom jest matchers for DOM assertions from @testing-library/jest-dom
require('@testing-library/jest-dom');

// Polyfill TextEncoder and TextDecoder for environments where they are missing (e.g., Node.js)
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;
