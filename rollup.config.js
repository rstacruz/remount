// rollup.config.js
import babel from 'rollup-plugin-babel'

export default [
  // Modern build, module
  {
    input: 'index.js',
    external: ['react', 'react-dom'],
    output: {
      file: 'dist/react-web-components.mjs',
      format: 'esm'
    }
  },

  // Modern build, commonJS
  {
    input: 'index.js',
    external: ['react', 'react-dom'],
    output: {
      file: 'dist/react-web-components.umd.js',
      format: 'umd',
      name: 'ReactWebComponents',
      globals: { react: 'React', 'react-dom': 'ReactDOM' }
    }
  },

  // Legacy build
  {
    input: 'index.js',
    plugins: [

    babel({
      exclude: 'node_modules/**'
    })
  ],
    external: ['react', 'react-dom'],
    output: {
      file: 'dist/react-web-components.es5.js',
      format: 'umd',
      name: 'ReactWebComponents',
      globals: { react: 'React', 'react-dom': 'ReactDOM' }
    }
  }
]
