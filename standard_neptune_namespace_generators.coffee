require './dist'
{log} = Neptune.Art.Foundation

NeptuneNamespacesGenerator = require 'neptune-namespaces/generator'

module.exports = (dirname, watch = true) ->
  log "neptune-namespaces generating namespaces for: ".grey + "#{dirname}/src/*".green
  log "neptune-namespaces generating namespaces for: ".grey + "#{dirname}/test/*".green
  log "neptune-namespaces generating namespaces for: ".grey + "#{dirname}/perf/*".green
  log "neptune-namespaces: watching...".blue if watch
  Promise.resolve()
  .then -> NeptuneNamespacesGenerator.generate "#{dirname}/src/*",  watch: watch
  .then -> NeptuneNamespacesGenerator.generate "#{dirname}/test/*", watch: watch
  .then -> NeptuneNamespacesGenerator.generate "#{dirname}/perf/*", watch: watch
  .then ->
    log "neptune-namespaces: ".grey + "done with #{if watch then "initial " else ""}namespace generation".green
