import fs from 'fs';
import path from 'path';

import React from 'react';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import express from 'express';

const PORT = parseInt(process.env.PORT) || 8080;
const DEV_SERVER_PORT = parseInt(process.env.DEV_SERVER_PORT) || PORT + 1;

const r = strings => path.resolve(__dirname, ...strings);

const devServerPublicPath = `http://localhost:${DEV_SERVER_PORT}/`;

const config = {
  entry: [
    `webpack-dev-server/client?${devServerPublicPath}`,
    'webpack/hot/only-dev-server',
    r`examples/index.js`,
  ],
  output: {
    publicPath: devServerPublicPath,
    path: '/',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'react-hot!babel?stage=0',
        include: [r`examples`, r`src`],
      },
    ],
  },
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

const compiler = webpack(config);

const webpackDevServer = new WebpackDevServer(compiler, {
  hot: true,
});
webpackDevServer.listen(DEV_SERVER_PORT);

const app = express();

app.get('/', (req, res) => {
  res.send(React.renderToString(
    <html>
      <head>
        <title>Examples</title>
      </head>
      <body>
        <h1>Examples</h1>
        <ul>
          {fs.readdirSync('./examples').map(item => (
            <li key={item}>
              <a href={item}>{item}</a>
            </li>
          ))}
        </ul>
      </body>
    </html>
  ));
});

app.use('/:item', (req, res) => {
  let { item } = req.params;

  res.send(React.renderToString(
    <html>
      <head>
        <title>{item}</title>
      </head>
      <body>
        <div id="container"></div>
        <script src={`http://localhost:${DEV_SERVER_PORT}/bundle.js`} />
        <script dangerouslySetInnerHTML={{
          __html: `EXAMPLES["./${item}"]()`,
        }} />
      </body>
    </html>
  ));
});

app.listen(PORT);
