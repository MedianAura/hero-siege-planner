import config from './default.config';
import html2 from 'rollup-plugin-html2';

const production = process.env.ROLLUP_WATCH === 'true';

config.input = 'src/frontend/main.ts';
config.output = {
  dir: '.out/frontend',
  sourcemap: true,
  format: 'iife',
};

if (production) {
  config.plugins.push(
    html2({
      template: 'pages/index.html',
    })
  );
}

export default config;
