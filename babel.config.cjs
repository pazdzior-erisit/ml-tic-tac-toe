module.exports = {
  env: {
    test: {
      plugins: [
        [
          "@babel/plugin-transform-react-jsx",
          {
            runtime: "automatic",
            importSource: "preact"
          }
        ]
      ]
    }
  }
}
