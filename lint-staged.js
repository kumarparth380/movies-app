module.exports = {
  '*.{js,jsx,ts,tsx}': [
    'eslint --max-warnings=0'
    // TODO- Add it once ready with tests
    // "npm test",
  ],
  '*.{js,jsx,ts,tsx,css}': ['prettier --write', 'eslint --fix']
};
