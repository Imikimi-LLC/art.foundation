require '../index'
ArtMocha = require "../src/art/dev_tools/test/mocha"

ArtMocha.run ({assert})->
  self.testAssetRoot = "/test/assets"
  require './tests'
