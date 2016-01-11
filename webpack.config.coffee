# TestPlugin = require "./test_plugin"
Webpack = require "webpack"

module.exports =
  entry: "./src/art/foundation"

  resolve:
    extensions: ["", ".webpack.js", ".web.js", ".js", ".coffee"]

  output:
    path: __dirname + "/build/art"
    filename: "foundation.js"

  # plugins: [
  #   new TestPlugin ["index.myjs"]
  # ]
  module:
    loaders: [
      { test: /\.coffee$/, loader: "coffee-loader" }
      { test: /\.(coffee\.md|litcoffee)$/, loader: "coffee-loader?literate" }
    ]
