
module.exports = [
  require "./StandardLib"
  require "./binary"
  require "./ClassSystem"

  require "./tools"

  package: _package = require "art-foundation/package.json"
  version: _package.version
]
