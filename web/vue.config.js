let plugins = [];
module.exports = {
  configureWebpack: {
    plugins: plugins,
    // Exclude moment js bundled with chart.js, because it's huge and not used
    // Only in case you need moment.js functionality with chart.js remove this exclusion
    externals: {
      moment: "moment",
    },
  },
  css: {
    loaderOptions: {
      scss: {
        // additionalData: `@import "~@/variables.scss";`,
      },
    },
  },
  // Disable output file hashing
  filenameHashing: false,
};
