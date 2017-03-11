{object, merge, w} = require 'art-standard-lib'
module.exports =
  package:
    dependencies:
      atob:                       '^2.0.3'
      "art-object-tree-factory":  '^1.0.0'
      xhr2: "^0.1.4"
    description: "Foundation classes for the Art framework. Javascript extensions.",

  webpack:
    common: {}
    targets:
      merge
        index: target: "node"
        object w("
          test
          perf
          worker_for_worker_rpc_tests
          dom_element_factories
        "), -> {}