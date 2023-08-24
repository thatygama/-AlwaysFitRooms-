const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  lintOnSave: false,
  transpileDependencies: true,
  configureWebpack: {
    plugins: [new BundleAnalyzerPlugin()]
  },
  chainWebpack: webpackConfig => {
    webpackConfig.resolve.alias.set('@Store', resolve('src/store'));
    webpackConfig.resolve.alias.set('@Views', resolve('src/views'));
    webpackConfig.resolve.alias.set('@Config', resolve('src/config'));
    webpackConfig.resolve.alias.set('@Consts', resolve('src/consts'));
    webpackConfig.resolve.alias.set('@Assets', resolve('src/assets'));
    webpackConfig.resolve.alias.set('@Mixins', resolve('src/mixins'));
    webpackConfig.resolve.alias.set('@Presenters', resolve('src/presenters'));
    webpackConfig.resolve.alias.set('@Dashboard', resolve('src/views/dashboard'));
    webpackConfig.resolve.alias.set('@EventBus', resolve('src/config/eventBus.js'));
    webpackConfig.resolve.alias.set('@Components', resolve('src/views/components'));
  }
}
