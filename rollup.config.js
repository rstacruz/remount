// rollup.config.js
import babel from 'rollup-plugin-babel'
import minify from 'rollup-plugin-babel-minify'

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
  }
]
