path = require "path"

module.exports = ({entries, outputPath, dirname}) ->
  outputPath ||= "dist"
  console.log "art-foundation: configure-webpack"
  console.log "  entries:    #{entries}"
  console.log "  outputPath: #{outputPath}"

  entry = ArtWebpackConfigurator._transformEntries entries
  console.log ""

  entry: entry

  resolve:
    extensions: ["", ".webpack.js", ".web.js", ".js", ".coffee"]

  output:
    path: path.join dirname, outputPath
    filename: "[name].js"

  module:
    loaders: [
      { test: /\.coffee$/, loader: "coffee-loader" }
      { test: /\.(coffee\.md|litcoffee)$/, loader: "coffee-loader?literate" }
      { test: /\.css$/, loader: "style-loader!css-loader" }
      { test: /\.png$/, loader: "url-loader?limit=100000" }
      { test: /\.jpg$/, loader: "file-loader" }
    ]

class ArtWebpackConfigurator

  ###################
  # PRIVATE
  ###################
  @_selectEnties: (entries) ->
    if selectedEntry = process.env.WEBPACK_ENTRIES
      console.log "detected environment variable: WEBPACK_ENTRIES=#{selectedEntry}"
      ret = {}

      selectedEntries = selectedEntry.split ','

      for entry in selectedEntries
        console.log "  building: #{entry}"
        ret[entry] = entries[entry]
      for k, v of entries
        console.log "  skipping: #{k}" unless ret[k]
      ret
    else
      console.log "buildling all entries"
      console.log "  NOTE: To build specific entries:"
      console.log "  $ WEBPACK_ENTRIES=myEntry1,myEntry2 webpack[-dev-server]"
      entries

  @_transformEntries: (entries) ->
    entryConfig = {}
    entries = entries.split /[,\s]+/ if typeof entries == "string"
    for entry in entries
      entryConfig[entry] = ["./#{entry}"]
    @_selectEnties entryConfig

