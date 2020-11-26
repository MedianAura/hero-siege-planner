import path from 'path';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import url from '@rollup/plugin-url';
import replace from '@rollup/plugin-replace';
import nodeResolve from '@rollup/plugin-node-resolve';
import vue from 'rollup-plugin-vue';
import esbuild from 'rollup-plugin-esbuild';
import externals from 'rollup-plugin-node-externals';

const production = process.env.ROLLUP_WATCH === 'true';

export default {
  plugins: [
    alias({
      entries: [
        { find: '@src', replacement: path.resolve(__dirname, '../src/') },
      ],
    }),
    externals(),
    nodeResolve(),
    replace({
      'process.env.NODE_ENV': process.env.NODE_ENV || '"production"',
    }),
    vue(),
    url(),
    commonjs(),
    json(),
    esbuild({
      include: [/\.js$/, /\.ts$/, /\.json$/],
      exclude: [/node_modules/],
      sourceMap: true,
      minify: production,
      target: 'es2015',
      loaders: {
        '.ts': 'ts',
        '.json': 'json',
      },
    }),
  ],
  watch: {
    clearScreen: true,
  },
};
