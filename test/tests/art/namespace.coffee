# generated by Neptune Namespaces v3.x.x
# file: tests/art/namespace.coffee

module.exports = (require '../namespace').addNamespace 'Art', class Art extends Neptune.PackageNamespace
  @version: require('../../../package.json').version
require './dev_tools/namespace';
require './foundation/namespace'