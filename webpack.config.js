var path = require('path')
var webpack = require('webpack')
var CopyWebpackPlugin = require('copy-webpack-plugin')

var projectName = quoted('EZCOIN2U')

var envs = {
  development: {
    API_HOST: quoted('http://localhost:8005'),
    REPORT_SERVICE_HOST: quoted('http://report.git4u.net:8087/ReportServer?%2fSIT_TradingP_Backend'),
    PROJECT_NAME: projectName,
    PUBLIC_PATH: quoted('/'),
    STATIC_FILE_PATH: 'http://localhost:8080/'
  },
  sit: {
    API_HOST: quoted('http://api-trading.git4u.net:63333'),
    REPORT_SERVICE_HOST: quoted('http://report.git4u.net:8087/ReportServer?%2fSIT_TradingP_Backend'),
    PROJECT_NAME: projectName,
    PUBLIC_PATH: quoted('/'),
    STATIC_FILE_PATH: 'http://192.168.51.31:21205/'
  },
  uat: {
    API_HOST: quoted('http://192.168.51.153:63333'),
    REPORT_SERVICE_HOST: quoted('http://report.git4u.net:8087/ReportServer?%2fUAT_TradingP_Backend'),
    PROJECT_NAME: projectName,
    PUBLIC_PATH: quoted('/'),
    STATIC_FILE_PATH: 'http://192.168.51.31:21207/'
  },
  production: {
    API_HOST: quoted('https://10.0.5.17:8080'),
    REPORT_SERVICE_HOST: quoted('http://125.227.132.132:8087/ReportServer?%2fTradingP_Backend'),
    PROJECT_NAME: projectName,
    PUBLIC_PATH: quoted('/backend/'),
    STATIC_FILE_PATH: 'https://autodiscover.ezcoin2u.com/backend/'
  },
}

var env = envs[process.env.NODE_ENV]

module.exports = {
  entry: {
    app: ['./src/main.js'],
    vendor: ['axios', 'element-ui', 'moment', 'ramda', 'vue', 'vue-localstorage', 'vue-router', 'vue-quill-editor'],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: env.STATIC_FILE_PATH,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'css-loader'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
    new webpack.DefinePlugin(env),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' })
  ]
}

if (process.env.NODE_ENV !== 'development') {
  module.exports.output = {
    path: path.resolve(__dirname, './dist'),
    publicPath: env.STATIC_FILE_PATH,
    filename: 'bundle.js'
  }
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: quoted(process.env.NODE_ENV)
      }
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, 'indexbuild.html'),
        to: path.join(__dirname, 'dist/index.html'),
      },
    ]),
  ])
} else {
  module.exports.output = {
    path: __dirname,
    publicPath: env.STATIC_FILE_PATH,
    filename: 'bundle.js'
  }
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map',
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}

function quoted(str) {
  return ["\'", str, "\'"].join('')
}