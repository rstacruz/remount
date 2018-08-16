// rollup.config.js
import buble from 'rollup-plugin-buble'

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
    plugins: [buble()],
    external: ['react', 'react-dom'],
    output: {
      file: 'dist/react-web-components.es5.js',
      format: 'umd',
      name: 'ReactWebComponents',
      globals: { react: 'React', 'react-dom': 'ReactDOM' }
    }
  }
]
