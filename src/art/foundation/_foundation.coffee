
module.exports = [
  require "./binary"
  require "./class_system"
  require "./standard_lib"

  require "./web_worker"
  require "./progress_adapter"
  require "./global_counts"
  package: _package = require "art-foundation/package.json"
  version: _package.version
]
