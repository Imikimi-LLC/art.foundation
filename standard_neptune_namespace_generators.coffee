NeptuneNamespacesGenerator = require 'neptune-namespaces/generator'

module.exports = (dirname, watch = true) ->
  Promise.resolve()
  .then -> NeptuneNamespacesGenerator.generate "#{dirname}/src/*",  watch: watch
  .then -> NeptuneNamespacesGenerator.generate "#{dirname}/test/*", watch: watch
  .then -> NeptuneNamespacesGenerator.generate "#{dirname}/perf/*", watch: watch
