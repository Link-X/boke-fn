const path = require('path')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// 热更新和实际区分开
const entry = process.env.npm_lifecycle_event === 'start' ? ['webpack-hot-middleware/client.js?reload=true', './src/index.js'] :  './src/index.js'

function resolve (dir) {
  return path.resolve(__dirname, dir)
}
module.exports = {
  entry: {
    main: entry
  },
  output: {
    path: path.resolve('D:/aly/www/build/www'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test:/\.css$/,   
        use: ExtractTextPlugin.extract({
            use:"css-loader",
            fallback:"style-loader",       
        })
      },  
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join('static', 'img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          plugins: [
            ['import', {libraryName: 'antd', style: true}]
          ]
        }
      },
      {
        test: /\.(html)$/,
        loader: 'html-loader',
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    // contentBase: './build',//默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（这里设置到"build"目录）
    historyApiFallback: true,
    inline: true,
    port: 3011,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:9008/',
        changeOrigin: true,
        cookieDomainRewrite: {
          '*': ''
        }
      }
    }
  },
  plugins: [
    new UglifyPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      minify: {
        minifyJS: true
      },
      template: path.resolve(__dirname, './index.html')
    }), 
    new ExtractTextPlugin({
      filename: '[name].min.css',
      allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
    optimization: {
      runtimeChunk: {
          "name": "manifest"
      },
      splitChunks: {
          chunks: 'all',
          cacheGroups: {
              common: {
                  minChunks: 2,
                  name: 'commons',
                  chunks: 'async',
                  priority: 10,
                  reuseExistingChunk: true,
                  enforce: true
              }
          }
      }
  },
  resolve: {
    extensions: ['.js', '.json', 'css', '.wasm', '.mjs'],
    alias: {
      '@': resolve('src'),
      'common': resolve('src/common')
    }
  }
}
