const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  entry: ['./client/index.js', '@babel/polyfill'],
  mode: isDev ? 'development' : 'production',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      }
    ]
  }
}
