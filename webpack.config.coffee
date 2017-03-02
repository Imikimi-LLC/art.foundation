module.exports = (require "./configure_webpack")
  entries: "index, test, perf, worker_for_worker_rpc_tests, dom_element_factories"
  # target: "node"
  # output: libraryTarget: "commonjs2"
  # externals: [
  #   "colors"
  #   "atob"
  #   "commander"
  #   "bluebird/js/browser/bluebird.core"
  # ]
  package:
    description: 'Foundation classes for the Art framework. Javascript extensions.'
    dependencies:
      atob:               '^2.0.3'
      commander:          '^2.9.0'
      bluebird:           "^3.4.6"
