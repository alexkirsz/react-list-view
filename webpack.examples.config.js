import path from 'path';
import webpack from 'webpack';

export default {
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
        include: [path.resolve('./examples'), path.resolve('./src')],
      },
    ],
  },
};
