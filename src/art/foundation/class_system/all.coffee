require './namespace'
.includeInNamespace null,
  [require("./inspect"), "inspect inspectLean miniInspect"]
  [require("./base_object"), "createWithPostCreate mixInto createAllClass createHotWithPostCreate"]
  require "./clone"
  require "./log"
