# generated by Neptune Namespaces v3.x.x
# file: Art.Foundation/namespace.coffee

module.exports = (require 'neptune-namespaces').addNamespace 'Art.Foundation', class Foundation extends Neptune.PackageNamespace
  @version: require('../../package.json').version
require './Binary/namespace';
require './Browser/namespace';
require './Tools/namespace'