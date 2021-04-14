module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? '/department-of-reuse'
  : '/',
  configureWebpack: {
    devServer: {
      headers: { 'Access-Control-Allow-Origin': '*' }
    }
  }
};
