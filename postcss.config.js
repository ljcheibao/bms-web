module.exports = {
  plugins: [
    require('autoprefixer')(
      {
        remove: false,
        browsers: [
          'iOS >= 7',
          'Android >= 4.1',
          'last 10 Chrome versions',
          'last 10 Firefox versions',
          'Safari >= 5',
          'ie > 8']
      }
    ),
    require('cssnano')({
      safe: true
    })
    // require('cssnano')({
    //   preset: 'default',
    // })
    //require("postcss-normalize-whitespace")()
  ]
}
