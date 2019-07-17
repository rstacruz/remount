module.exports = {
  presets: [['@babel/preset-env', { modules: false }], '@babel/preset-react'],
  env: {
    test: {
      presets: ['@babel/preset-env', '@babel/preset-react']
    },
    'test-rollup': {
      presets: [
        ['@babel/preset-env', { modules: false }],
        '@babel/preset-react'
      ]
    }
  }
}
