StandardLib = require './src/art/foundation/standard_lib'
{peek, deepMerge, consistentJsonStringify} = StandardLib
fs = require 'fs'
path = require "path"
runNeptuneNamespaces = require './standard_neptune_namespace_generators'

standardNpmPackageProps =
  license: 'ISC'
  name: peek process.cwd().split("/")
  version: JSON.parse(fs.readFileSync("package.json").toString()).version
  author: "Shane Brinkman-Davis Delamore, Imikimi LLC"
  dependencies:
    'neptune-namespaces': '^0.5.5'
    'chai': '^3.5.0'
    'coffee-loader': '^0.7.2'
    'coffee-script': '^1.10.0'
    'css-loader': '^0.23.1'
    'json-loader': '^0.5.4'
    'mocha': '^2.5.3'
    'script-loader': '^0.7.0'
    'sourcemapped-stacktrace': '^1.1.3'
    'style-loader': '^0.13.1'
    'webpack': '^1.13.1'
    'webpack-dev-server': '^1.14.0'
  scripts:
    test:     'neptune-namespaces --std; webpack-dev-server -d --progress'
    dev:      'neptune-namespaces --std; webpack-dev-server -d --progress'
    hot:      'neptune-namespaces --std; webpack-dev-server --hot --inline --progress'
    nodeTest: 'neptune-namespaces --std;mocha -u tdd --compilers coffee:coffee-script/register'
    nn:       'neptune-namespaces --std'

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

module.exports = (options, rest...) ->
  {entries, outputPath, dirname} = options
  dirname ||= process.cwd()
  outputPath ||= "dist"
  console.log "art-foundation: configure-webpack"
  console.log "  entries:    #{entries}"
  console.log "  outputPath: #{outputPath}"

  entry = ArtWebpackConfigurator._transformEntries entries
  console.log ""
  if npmPackage = options.package
    npmPackage = deepMerge standardNpmPackageProps, npmPackage
    contents = consistentJsonStringify npmPackage, "  "
    console.log "writing: ".gray + "package.json".green
    # console.log "contents:", contents
    fs.writeFileSync "package.json", contents

  console.log "NeptuneNamespaces generation...".grey
  runNeptuneNamespaces dirname
  .then ->
    # NOTE: webpack is fine with us returning a promise from config, but webpack-dev-server ISN'T
    # DETAILS: https://github.com/webpack/webpack-dev-server/pull/419
    #   looks like it's in the upcoming 2.0 release, but not in 1.x - which is the current stable release
    console.log "NeptuneNamespaces generation done.".grey

  result =
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
        { test: /\.json$/, loader: "json-loader" }
      ]
  if rest.length > 0
    [result].concat rest
  else
    result
