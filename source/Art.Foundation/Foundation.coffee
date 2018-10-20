
module.exports = [
  require 'art-standard-lib'
  require './ForHumans'
  require "art-class-system"
  require "art-config"
  Epoch: require('art-epoched-state').EpochClass

  require "./Binary"
  require "./Tools"

  package: _package = require "art-foundation/package.json"
  version: _package.version
]
