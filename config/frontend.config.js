import config from './default.config';
import html2 from 'rollup-plugin-html2';

config.input = 'src/frontend/main.ts';
config.output = {
  dir: '.out/frontend',
  sourcemap: true,
  format: 'iife',
};

config.plugins.push(
  html2({
    template: 'pages/index.html',
  })
);

export default config;
