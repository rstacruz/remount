// rollup.config.js
import babel from 'rollup-plugin-babel'
import minify from 'rollup-plugin-babel-minify'
import server from 'rollup-plugin-server'
import copy from 'rollup-plugin-copy'

const IS_TEST = process.env.NODE_ENV === 'test-rollup'
const IS_WATCH = process.argv.includes('--watch')

const MINIFY = minify({ comments: false })

const BABEL = babel({
  exclude: 'node_modules/**'
})

const DEFAULTS = {
  input: 'index.js',
  external: ['react', 'react-dom']
}

const UMD = {
  format: 'umd',
  name: 'Remount',
  globals: { react: 'React', 'react-dom': 'ReactDOM' }
}

const SERVE_PLUGINS = IS_WATCH
  ? [
      server({
        // open: true,
        contentBase: 'dist',
        port: +(process.env.PORT || 10049)
      })
    ]
  : []

const TEST_MODULES = IS_TEST
  ? [
      {
        input: 'browser_test/test.js',
        plugins: [
          BABEL,
          copy({
            'browser_test/index.html.template': 'dist/index.html'
          }),
          ...SERVE_PLUGINS
        ],
        output: { file: 'dist/test.js', format: 'cjs' }
      }
    ]
  : []

export default [
  // ES Modules
  {
    ...DEFAULTS,
    output: { file: 'dist/remount.esm.mjs', format: 'esm' }
  },

  {
    ...DEFAULTS,
    plugins: [MINIFY],
    output: { file: 'dist/remount.esm.min.mjs', format: 'esm' }
  },

  // ES6
  {
    ...DEFAULTS,
    output: { file: 'dist/remount.es6.js', ...UMD }
  },

  {
    ...DEFAULTS,
    plugins: [MINIFY],
    output: { file: 'dist/remount.es6.min.js', ...UMD }
  },

  // ES5
  {
    ...DEFAULTS,
    plugins: [BABEL],
    output: { file: 'dist/remount.es5.js', ...UMD }
  },

  {
    ...DEFAULTS,
    plugins: [BABEL, MINIFY],
    output: { file: 'dist/remount.es5.min.js', ...UMD }
  },

  ...TEST_MODULES
]
