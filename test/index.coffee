require '../index'
{Mocha} = require "../dev_tools/test"

Mocha.run ({assert})->
  self.testAssetRoot = "/test/assets"
  require './tests'
