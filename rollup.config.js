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
  // Modern build, module
  {
    ...DEFAULTS,
    output: { file: 'dist/remount.esm.mjs', format: 'esm' }
  },

  // Modern build, module (min)
  {
    ...DEFAULTS,
    plugins: [MINIFY],
    output: { file: 'dist/remount.esm.min.mjs', format: 'esm' }
  },

  // Modern build, commonJS
  {
    ...DEFAULTS,
    output: { file: 'dist/remount.umd.js', ...UMD }
  },

  // Modern build, commonJS
  {
    ...DEFAULTS,
    plugins: [MINIFY],
    output: { file: 'dist/remount.umd.min.js', ...UMD }
  },

  // Legacy build
  {
    ...DEFAULTS,
    plugins: [BABEL],
    output: { file: 'dist/remount.legacy.js', ...UMD }
  },

  // Legacy build (min)
  {
    ...DEFAULTS,
    plugins: [BABEL, MINIFY],
    output: { file: 'dist/remount.legacy.min.js', ...UMD }
  }
]
