var path = require('path');

module.exports = {
    entry: [
      // Set up an ES6-ish environment
      'babel-polyfill',

      // Add your application's scripts below
      './index.js',
    ],
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },
            {
              loader: "babel-loader",

              exclude: [
                path.resolve(__dirname, "node_modules"),
              ],

              // Only run `.js` and `.jsx` files through Babel
              test: /\.jsx?$/,

              // Options to configure babel with
              query: {
                plugins: ['transform-runtime'],
                presets: ['es2015', 'stage-0', 'react'],
              }
          },
          { test: /\.(woff|woff2)$/,  loader: "url-loader?limit=10000&mimetype=application/font-woff" },
          { test: /\.ttf$/,    loader: "file-loader" },
          { test: /\.eot$/,    loader: "file-loader" },
          { test: /\.svg$/,    loader: "file-loader" },
          { test: /\.(png|jpg)$/, loader: 'url-loader?limit=50000' }
        ]
    }
};
