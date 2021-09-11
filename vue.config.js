const path_url = process.env.NODE_ENV === 'production' ? '/ams_frontend/dist' : 'http://localhost:8080/shiropa';
const path = require("path");
module.exports = {
    lintOnSave: false,
    runtimeCompiler: true,
    publicPath:path_url,
    productionSourceMap: false,
    pages: {
        'index': {
          entry: './src/main.js',
          template: 'public/index.html',
          title: 'Index',
          filename: 'index.html',
          chunks: [ 'chunk-vendors', 'chunk-common', 'index' ]
        },
        'print': {
          entry: './src/pages/print/main.js',
          template: 'public/print.html',
          title: 'Print',
          filename: 'print.html',
          chunks: [ 'chunk-vendors', 'chunk-common', 'print' ]
        },
        'print-new': {
          entry: './src/pages/print-new/main.js',
          template: 'public/print-new.html',
          title: 'Print',
          filename: 'print-new.html',
          chunks: [ 'chunk-vendors', 'chunk-common', 'print-new' ]
        }
      },
      pwa: {
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
          swSrc: './src/service-workers/sw.js',
          swDest: 'service-worker.js',
        },
      },
      configureWebpack: {
        performance: {
          hints: false
        }
      }
}


