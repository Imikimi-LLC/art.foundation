Async = require "./namespace"
Basic = require './basic'

addAll = (klass)->
  for k, v of klass
    # console.log "addAll #{klass.name}.#{k}"
    console.log "addAll to Foundation: conflict on #{k} from #{klass.name}" if Async[k]
    Async[k] = v

addAll Basic
