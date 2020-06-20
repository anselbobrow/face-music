module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif)$/,
        loader: 'file-loader',
        options: {
          esModule: false,
          name: '[name].[hash].[ext]',
          outputPath: 'imgs',
        },
      },
    ],
  },
  // use face-api on the web without getting a file system error from node:
  node: {
    fs: 'empty',
  },
};
