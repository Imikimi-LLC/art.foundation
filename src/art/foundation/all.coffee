require "./namespace"
.includeInNamespace null,
  [require("./base_object"), "createWithPostCreate mixInto createAllClass createHotWithPostCreate"]

  require "./standard_lib"

  require "./web_worker"
  require "./async"
  require "./call_stack"
  require "./global_counts"
  require "./regexp"
  require "./ruby"
