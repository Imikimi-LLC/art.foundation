{object, merge, w} = require 'art-standard-lib'
module.exports =
  package:
    dependencies:
      atob:                       '^2.0.3'
      "art-object-tree-factory":  '^1.0.0'
      'art-communication-status': '^1.0.0'
      'art-rest-client':          '^1.0.0'
      'art-validator':            '^1.0.0'

    description: "Foundation classes for the Art framework. Javascript extensions."

  webpack:
    common: {}
    targets:
      merge
        index: {}
        object w("
          test
          perf
          worker_for_worker_rpc_tests
          dom_element_factories
        "), -> {}