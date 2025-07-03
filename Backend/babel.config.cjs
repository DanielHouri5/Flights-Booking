// Babel configuration file for the Backend project
// This configures Babel to use the @babel/preset-env preset
// with the target set to the current Node.js version (for Jest and Node compatibility)
export default {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
};
