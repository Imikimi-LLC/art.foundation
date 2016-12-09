module.exports = (require "./configure_webpack")
  entries: "index, test, perf, worker_for_worker_rpc_tests, dom_element_factories"
  package:
    description: 'Foundation classes for the Art framework. Javascript extensions.'
    dependencies:
      atob:               '^2.0.3'
      'promise-polyfill': '^6.0.2'
      commander:          '^2.9.0'
      bluebird:           "^3.4.6"
