// rollup.config.js
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import minify from 'rollup-plugin-babel-minify'
import server from 'rollup-plugin-server'
import copy from 'rollup-plugin-copy'

const IS_TEST = process.env.NODE_ENV === 'test-rollup'
const IS_WATCH = process.argv.includes('--watch')

const MINIFY = minify({ comments: false })

// Modern builds will not bundle dependencies
const PLUGINS = [resolve({ browser: true }), commonjs()]

const BABEL = babel({
  exclude: 'node_modules/**'
})

const DEFAULTS = {
  input: 'index.js',
  external: ['react', 'react-dom', 'react-dom/client']
}

const UMD = {
  format: 'umd',
  name: 'Remount',
  globals: { react: 'React', 'react-dom/client': 'ReactDOM' }
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
        input: 'test/browser_test.js',
        plugins: [
          BABEL,
          copy({
            'test/index.html.template': 'dist/index.html'
          }),
          ...SERVE_PLUGINS
        ],
        output: { file: 'dist/browser_test.js', format: 'cjs' }
      }
    ]
  : []

export default [
  // ES Modules
  {
    ...DEFAULTS,
    plugins: [...PLUGINS],
    output: { file: 'dist/remount.js', format: 'esm' }
  },

  {
    ...DEFAULTS,
    plugins: [...PLUGINS, MINIFY],
    output: { file: 'dist/remount.min.js', format: 'esm' }
  },

  // ES5
  {
    ...DEFAULTS,
    plugins: [...PLUGINS, BABEL],
    output: { file: 'dist/remount.es5.js', ...UMD }
  },

  {
    ...DEFAULTS,
    plugins: [...PLUGINS, BABEL, MINIFY],
    output: { file: 'dist/remount.es5.min.js', ...UMD }
  },

  ...TEST_MODULES
]
