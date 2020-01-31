module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? './' // prod
    : '/', // dev
    devServer: {
      proxy: 'https://pylearn.info/modules/'
      // https: true
    }
}