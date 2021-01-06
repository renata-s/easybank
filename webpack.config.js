const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const Route = require('./config/routes');

const Routes = Object.values(Route);

module.exports = {
  entry: ['./src/js/index.js', './src/styles/index.scss'],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '.dist')
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader')
      },
      {
        exclude: /node_modules|favicons/,
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: require.resolve('file-loader'),
        options: {
          name: '[name].[ext]',
          publicPath: './images/',
          outputPath: 'images/'
        }
      },
      {
        exclude: /node_modules/,
        test: /manifest\.json$/,
        loader: require.resolve('file-loader'),
        options: {
          name: '[name].[ext]'
        },
        type: 'javascript/auto'
      },
      {
        exclude: /node_modules|images/,
        test: /(ico|png)$/,
        loader: require.resolve('file-loader'),
        options: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: require.resolve('file-loader'),
            options: {
              name: 'main.css'
            }
          },
          require.resolve('extract-loader'),
          require.resolve('css-loader'),
          require.resolve('postcss-loader'),
          require.resolve('sass-loader')
        ]
      }
    ]
  },
  plugins: [
    ...Routes.map(
      ({ title, file, url }) =>
        new HtmlWebpackPlugin({
          template: file,
          title,
          url
        })
    ),
    new HtmlWebpackTagsPlugin({ tags: ['main.css'], append: true }),
    new CopyPlugin([
      {
        from: 'src/images',
        to: 'images'
      }
    ])
  ],
  devServer: {
    contentBase: path.join(__dirname, '.dist'),
    compress: true,
    port: 9000,
    open: true
  }
};
