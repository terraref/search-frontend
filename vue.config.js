var path = require('path')

module.exports = {
  lintOnSave: false,

  // devServer: {
  //   host: 'workflows.agbase.arizona.edu'
  // },

  devServer: {
    clientLogLevel: 'info'
  },

  // pwa: {
  //   name: 'TERRA-REF Advanced Search',
  //   themeColor: '#0E718A',
  //   msTileColor: '#45B0C7',
  //   workboxPluginMode: 'InjectManifest',
  //   workboxOptions: {
  //     swSrc: path.join(__dirname, 'src', 'service-worker.js')
  //   }
  // },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'stylus',
      patterns: [
        path.resolve(__dirname, './src/stylus/variables.styl')
      ]
    }
  }
}
