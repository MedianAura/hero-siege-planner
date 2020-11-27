const historyFallback = require('connect-history-api-fallback');
module.exports = {
  watch: true,
  server: {
    baseDir: '.out/frontend/',
  },
  middleware: [historyFallback()],
  cwd: '.',
  logLevel: 'debug',
  single: false,
  minify: false,
  open: false,
};
