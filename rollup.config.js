// rollup.config.js
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import minify from 'rollup-plugin-babel-minify'
import server from 'rollup-plugin-server'
import copy from 'rollup-plugin-copy'

// https://github.com/rollup/rollup-watch/issues/48
const IS_WATCH = !!process.env.ROLLUP_WATCH

const MINIFY = minify({ comments: false })

// Modern builds will not bundle dependencies
const PLUGINS = [resolve({ browser: true }), commonjs()]

const BABEL = babel({
  exclude: 'node_modules/**'
})

const DEFAULTS = {
  input: 'index.js',
  external: ['react', 'react-dom', 'react-shadow-dom-retarget-events']
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

const getConfig = () => [
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
    external: ['react', 'react-dom'],
    plugins: [...PLUGINS, BABEL],
    output: { file: 'dist/remount.es5.js', ...UMD }
  },

  {
    ...DEFAULTS,
    external: ['react', 'react-dom'],
    plugins: [...PLUGINS, BABEL, MINIFY],
    output: { file: 'dist/remount.es5.min.js', ...UMD }
  },

  ...(IS_WATCH ? getTestModules() : [])
]

const getTestModules = () => [
  {
    input: 'browser_test/test.js',
    plugins: [
      BABEL,
      copy({
        targets: {
          src: 'browser_test/index.html.template',
          dest: 'dist/index.html'
        }
      }),
      ...SERVE_PLUGINS
    ],
    output: { file: 'dist/test.js', format: 'cjs' }
  }
]

export default getConfig()
