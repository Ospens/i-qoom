const {
  styles
} = require('@ckeditor/ckeditor5-dev-utils')
const cssModuleRegex = /\.module\.css$/
const cssRegex = /\.css$/
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  module: {
    loaders: [
      {
        test: cssRegex,
        exclude: [
          cssModuleRegex,
          /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css/,
        ]
      }, {
        test: cssModuleRegex,
        exclude: [
          /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css/,
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
