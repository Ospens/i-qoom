const {environment} = require('@rails/webpacker')
/*const customConfig = require('./custom')

environment.config.merge(customConfig)*/
environment.loaders.insert('svg', {
  test: /ckeditor5-[^/]+\/theme\/icons\/[^/]+\.svg$/,
  use: 'raw-loader'
  }, {
    after: 'file'
  })

const fileLoader = environment.loaders.get('file')
fileLoader.exclude = /ckeditor5-[^/]+\/theme\/icons\/[^/]+\.(svg)$/i

module.exports = environment
