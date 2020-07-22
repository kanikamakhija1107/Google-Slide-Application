const path = require('path');

const devServerPort = 8080;
module.exports = {
  entry: './src/text.js',
  devtool: "source-map",
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};

//Dev Server configuration
devServerConfig = {
    port: devServerPort,
    publicPath: '/dist/',
    hotOnly: true,
    open: true,
    openPage: './slide.html',
    public: 'localhost:' + devServerPort,
    headers: {
        "Access-Control-Allow-Origin": "*"
    },
    clientLogLevel: 'info',
    stats: {
        colors: true,
        assets: true,
        warnings: true
    }
};