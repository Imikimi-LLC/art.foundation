module.exports =
  entry: "./src/art/foundation"

  resolve:
    extensions: ["", ".webpack.js", ".web.js", ".js", ".coffee"]

  output:
    path: __dirname + "/dist"
    filename: "index.js"

  module:
    loaders: [
      { test: /\.coffee$/, loader: "coffee-loader" }
      { test: /\.(coffee\.md|litcoffee)$/, loader: "coffee-loader?literate" }
    ]

  devtool: "#cheap-eval-source-map"
