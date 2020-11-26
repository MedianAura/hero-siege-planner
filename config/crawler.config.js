import alias from '@rollup/plugin-alias'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json';
import vue from 'rollup-plugin-vue'
import esbuild from 'rollup-plugin-esbuild'
import externals from 'rollup-plugin-node-externals'

const production = !process.env.ROLLUP_WATCH

export default {
  input: 'src/crawler/main.ts',
  output: {
    file: '.out/crawler/main.js',
    format: 'commonjs'
  },
  plugins: [
    alias({
      entries: [{find: '@', replacement: __dirname + '/src/'}],
    }),
    externals(),
    commonjs(),
    json(),
    vue(),
    esbuild({
      minify: production,
      target: 'es2015',
      loaders: {
        '.ts': 'ts',
        '.json': 'json'
      },
      outdir: '.out',
    })
  ],
  watch: {
    clearScreen: true,
  },
}
