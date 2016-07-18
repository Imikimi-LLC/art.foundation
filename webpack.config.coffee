module.exports = (require "art-foundation/configure_webpack")
  entries: "index, test, perf, worker_for_worker_rpc_tests, dom_element_factories"
  dirname: __dirname
  package:
    description: 'Foundation classes for the Art framework. Javascript extensions.'
    dependencies:
      atob: '^2.0.3'
      'promise-polyfill': '^5.2.1'
