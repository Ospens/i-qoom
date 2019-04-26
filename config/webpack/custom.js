const {
  styles
} = require('@ckeditor/ckeditor5-dev-utils')
const cssModuleRegex = /\.module\.css$/
const cssRegex = /\.css$/

module.exports = {
  module: {
    rules: [
      {
        test: cssRegex,
        exclude: [
          cssModuleRegex,
          /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css/,
        ]
      },
      {
        test: cssModuleRegex,
        exclude: [
          /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css/,
        ]
      },
      {
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
        use: ['raw-loader']
      },
      {
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css/,
        use: [{
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
      },
      {
        loader: require.resolve('file-loader'),
        // Exclude `js` files to keep the "css" loader working as it injects
        // its runtime that would otherwise be processed through the "file" loader.
        // Also exclude `html` and `json` extensions so they get processed
        // by webpack's internal loaders.
        exclude: [
          /\.(js|mjs|jsx|ts|tsx)$/,
          /\.html$/,
          /\.json$/,
          /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
          /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css/
        ],
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
        }
      }
    ]
  }
}
