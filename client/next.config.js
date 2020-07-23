module.exports = {
    // Fix for file change detection in browser
    webpackDevMiddleware: config => {
      // Assigning that we need to pull all diff files for every 300ms
      config.watchOptions.poll = 300;
      return config;
    }
  };
  