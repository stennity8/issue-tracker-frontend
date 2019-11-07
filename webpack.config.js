const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    // I think you could make this just './src/index.js' by putting
    // `import '@babel/polyfill';` at the top of index.js.  I generally like to
    // keep the webpack entry to a single file so all other imports are clear
    // in the source code instead of being over in a separate build file
    app: ['@babel/polyfill', './src/index.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },
  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['@babel/preset-env']
      }
    }]
  }
}
