const path = require('path')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// 热更新和实际区分开
const entry = process.env.npm_lifecycle_event === 'start' ? ['webpack-hot-middleware/client.js?reload=true', './src/index.js'] : './src/index.js'

function resolve (dir) {
  return path.resolve(__dirname, dir)
}
module.exports = {
  entry: {
    main: entry
  },
  output: {
    path: path.resolve('D:/aly/www/www'),
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
    // contentBase: './build',//默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（本例设置到"build"目录）
    historyApiFallback: true, // 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    inline: true, // 设置为true，当源文件改变时会自动刷新页面
    port: 3011, // 设置默认监听端口，如果省略，默认为"8080"
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
      filename: 'index.html', // 配置输出文件名和路径
      minify: { // 压缩 HTML 的配置
        minifyJS: true // 压缩 HTML 中出现的 JS 代码
      },
      template: path.resolve(__dirname, './index.html')
    }),
    new ExtractTextPlugin("styles.css"),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['.js', '.json', 'css', '.wasm', '.mjs'], // 查找文件顺序
    alias: { // 别名
      '@': resolve('src')
    }
  }
}
