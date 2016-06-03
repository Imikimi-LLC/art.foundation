
module.exports = [
  require "./standard_lib"
  require "./binary"
  require "./class_system"

  require "./tools"

  package: _package = require "art-foundation/package.json"
  version: _package.version
]
