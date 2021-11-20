module.exports = {
    devServer: {
      proxy: {
        '^/api': {
          target: 'https://securent.daxnbrain.hfctf.ca',
          changeOrigin: true
        },
      }
    }
  }
