{defineModule} = require './CommonJs'
{formattedInspect} = require './Inspect'

defineModule module, ->
  ErrorWithInfo = (@message = "see info", @info) ->
    @name = 'ErrorWithInfo'
    @stack = (new Error()).stack
    console.log "new ErrorWithInfo", @stack
    @toString = ->
      """
      ErrorWithInfo:
        message: #{formattedInspect @message}
        info:
          #{formattedInspect(@info).replace /\n/g, "\n    "}
      #{@stack}
      """
    @
  ErrorWithInfo.prototype = Object.create Error.prototype
  ErrorWithInfo.prototype.constructor = ErrorWithInfo
  ErrorWithInfo