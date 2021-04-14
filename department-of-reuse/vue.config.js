module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? '/DoR'
  : '/',
  configureWebpack: {
    devServer: {
      headers: { 'Access-Control-Allow-Origin': '*' }
    }
  }
};
