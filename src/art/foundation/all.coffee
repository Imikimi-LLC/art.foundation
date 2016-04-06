require "./namespace"
.includeInNamespace null,
  [require("./base_object"), "createWithPostCreate", "mixInto", "createAllClass", "createHotWithPostCreate"]
  [require("./inspect"),     "inspect", "inspectLean", "miniInspect"]

  require "./array"
  require "./async"
  require "./call_stack"
  require "./clone"
  require "./eq"
  require "./function"
  require './global_counts'
  require "./hash"
  require "./log"
  require "./math"
  require './promised_file_reader'
  require "./regexp"
  require "./ruby"
  require "./shallow_clone"
  require "./string"
  require "./time"
  require "./types"
  require "./web_worker"
