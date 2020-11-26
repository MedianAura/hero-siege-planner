const historyFallback = require('connect-history-api-fallback');
module.exports = {
  files: ['.out/frontend/**/*.*', '.out/frontend/*.htm?'],
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
