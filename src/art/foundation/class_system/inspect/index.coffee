# generated by Neptune Namespaces v0.3.0
# file: art/foundation/class_system/inspect/index.coffee

(module.exports = require './namespace')
.includeInNamespace(require './_inspect')
.addModules
  FormattedInspect:   require './formatted_inspect'
  Inspector:          require './inspector'
  Inspector2:         require './inspector2'
  ToInspectedObjects: require './to_inspected_objects'
require './inspected'