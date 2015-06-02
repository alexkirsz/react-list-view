let exampleRequire = require.context('./', true, /\.jsx?$/);

global.EXAMPLES = {};
exampleRequire.keys().forEach(key => {
  global.EXAMPLES[key] = exampleRequire.bind(null, key);
});
