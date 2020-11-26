import config from './default.config';

config.plugins = config.plugins.filter((plugin) => {
  return plugin.name !== 'node-resolve'
});

config.input = 'src/backend/main.ts';
config.output = {
  dir: '.out/backend',
  sourcemap: true,
  format: 'cjs',
};

export default config;
