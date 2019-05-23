const {environment} = require('@rails/webpacker')
const { styles } = require('@ckeditor/ckeditor5-dev-utils')

environment.loaders.insert('svg', {
  test: /ckeditor5-[^/]+\/theme\/icons\/[^/]+\.svg$/,
  use: 'raw-loader'
}, {
    after: 'file'
  })

environment.loaders.insert('ckCss', {
  test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css/,
  use: [
    {
      loader: 'style-loader',
      options: {
        singleton: true
      }
    },
    {
      loader: 'postcss-loader',
      options: styles.getPostCssConfig({
        themeImporter: {
          themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
        },
        minify: true
      })
    }
  ]
}, {
    before: 'css'
  })

const fileLoader = environment.loaders.get('file')
const cssLoader = environment.loaders.get('css')
const moduleCssLoader = environment.loaders.get('moduleCss')
fileLoader.exclude = /ckeditor5-[^/]+\/theme\/icons\/[^/]+\.(svg)$/i
cssLoader.exclude = /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css/
moduleCssLoader.exclude = /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css/

module.exports = environment
