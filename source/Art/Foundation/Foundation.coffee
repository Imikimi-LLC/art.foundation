
module.exports = [
  require 'art-standard-lib'
  require "./Binary"
  require "./ClassSystem"

  require "./Tools"

  package: _package = require "art-foundation/package.json"
  version: _package.version
]
