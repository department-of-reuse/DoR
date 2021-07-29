module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? '/'
  : '/',
  configureWebpack: {
    devServer: {
      headers: { 'Access-Control-Allow-Origin': '*' }
    }
  }
};
