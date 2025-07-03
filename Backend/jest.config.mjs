// Jest configuration file for the Backend project
// This configures Jest to use the Node environment and Babel for transforming JS files
// The moduleNameMapper ensures that imports with .js extensions are resolved correctly
export default {
  // Use Node.js as the test environment
  testEnvironment: 'node',
  // Use babel-jest to transform JavaScript files
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  // Map module imports ending with .js to the correct path (for ESM compatibility)
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};
