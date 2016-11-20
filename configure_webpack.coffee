require './index'
{inspect, peek, deepMerge, consistentJsonStringify, log, merge} = Neptune.Art.Foundation

[executable, firstArg] = process.argv
isWebpackDevServer = !!(executable.match(/\/node$/) &&
  firstArg?.match /webpack-dev-server/)

fs = require 'fs'
path = require "path"
runNeptuneNamespaces = require './standard_neptune_namespace_generators'

getStandardNpmPackageProps = ->
  license: 'ISC'
  name: peek process.cwd().split("/")
  version: JSON.parse(fs.readFileSync("package.json").toString()).version
  author: "Shane Brinkman-Davis Delamore, Imikimi LLC"
  dependencies:
    'neptune-namespaces': '^1.5.0'
    'chai': '^3.5.0'
    'coffee-loader': '^0.7.2'
    'coffee-script': '^1.11.1'
    'css-loader': '^0.23.1'
    'json-loader': '^0.5.4'
    'mocha': '^2.5.3'
    'script-loader': '^0.7.0'
    'sourcemapped-stacktrace': '^1.1.3'
    'style-loader': '^0.13.1'
    'webpack': '^1.13.2'
    'webpack-dev-server': '^1.16.2'
  scripts:
    test:     'neptune-namespaces --std; webpack-dev-server -d --progress'
    dev:      'neptune-namespaces --std; webpack-dev-server -d --progress'
    hot:      'neptune-namespaces --std; webpack-dev-server --hot --inline --progress'
    nodeTest: 'neptune-namespaces --std; mocha -u tdd --compilers coffee:coffee-script/register'
    nn:       'neptune-namespaces --std'
    build:    'neptune-namespaces --std; webpack --progress'

class ArtWebpackConfigurator

  ###################
  # PRIVATE
  ###################
  @_selectEnties: (entries) ->
    if selectedEntry = process.env.WEBPACK_ENTRIES
      log """
        Configuring webpack to build entries eelcted in: WEBPACK_ENTRIES=#{selectedEntry}
        """
      ret = {}

      selectedEntries = selectedEntry.split ','

      for entry in selectedEntries
        log "  building: #{entry}"
        ret[entry] = entries[entry]
      for k, v of entries
        log "  skipping: #{k}" unless ret[k]
      ret
    else
      log """
        webpack entries: #{Object.keys(entries).join(', ').green}

          NOTE: Webpack is slower if building more entries.
            To only build specific entries, use the following command-line pattern.
            (this is an art-foundation configure-webpack feature, not a webpack-feature)

            $ WEBPACK_ENTRIES=myEntry1,myEntry2 webpack[-dev-server]
        """.gray
      entries

  @_transformEntries: (entries) ->
    entryConfig = {}
    entries = entries.split /[,\s]+/ if typeof entries == "string"
    for entry in entries
      entryConfig[entry] = ["./#{entry}"]
    @_selectEnties entryConfig

createPackageJson = (npmPackage) ->
  npmPackage = deepMerge getStandardNpmPackageProps(), npmPackage
  contents = consistentJsonStringify npmPackage, "  "
  log "generating and writing: ".gray + "package.json".green
  # log npmPackage: npmPackage, contents: contents
  fs.writeFileSync "package.json", contents + "\n"

createWebpackConfig = (options) ->
  {dirname, outputPath, rest} = options
  log "generating and returning: ".gray + "webpack.config".green
  result = merge options,

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

module.exports = (options, rest...) ->
  {entries, outputPath, dirname} = options
  dirname ||= process.cwd()
  outputPath ||= "build"
  log "\n-------------------------------------------------------------------------".gray
  log "configuring webpack in: ".gray + dirname.green
  log "-------------------------------------------------------------------------".gray

  entry = ArtWebpackConfigurator._transformEntries entries
  webpackOptions = merge options,
    dirname: dirname
    outputPath: outputPath
    entry: entry
    rest: rest

  log ""
  if npmPackage = options.package
    createPackageJson npmPackage

  # NOTE: webpack is fine with us returning a promise from config, but webpack-dev-server ISN'T
  # DETAILS: https://github.com/webpack/webpack-dev-server/pull/419
  #   looks like it's in the upcoming 2.0 release, but not in 1.x - which is the current stable release
  if isWebpackDevServer
    runNeptuneNamespaces dirname, isWebpackDevServer
    createWebpackConfig webpackOptions
  else
    runNeptuneNamespaces dirname, isWebpackDevServer
    .then -> createWebpackConfig webpackOptions
