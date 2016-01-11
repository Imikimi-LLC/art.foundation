define [
  "./namespace"
], (Foundation) ->

  class Log
    # autodetect context from
    #   stack (grabed with Foundation.callStack()). Ignores stack[0]
    #   defaultContext - what to report if context cannot be determined

    @contextString: (stack, defaultContext) ->
      if stack && caller = stack[1]
        context = if caller.function
          if caller.class
            "#{caller.class}::#{caller.function}()"
          else
            caller.function+"()"
        else if defaultContext
          defaultContext+":"
        else
          ""
        caller.sourceFileName + "-#{caller.sourceLine}: " + context if caller.sourceFileName
      else
        "()"

    @autoSizedIndepect: (toInspect, maxLength = 512, maxDepth = 10) ->
      inspected = null
      depth = maxDepth
      depth-- while (inspected = Foundation.Inspect.inspectLean toInspect, maxDepth:depth, maxLength:maxLength).match(/\.\.\.$/)
      inspected

    @loggedParamsString: (params) ->
      if typeof params == "string"
        params
      else
        @autoSizedIndepect params

    @hideLogging: -> @loggingHidden = true
    @showLogging: -> @loggingHidden = false

    @rawLog: ->
      console.log arguments... unless @loggingHidden

    @rawErrorLog: ->
      console.error arguments... unless @loggingHidden

    @logCore: (m, stack, className) ->
      if @alternativeLogger
        @alternativeLogger.logCore m, stack, className
      else
         @rawLog "#{@contextString stack, className} " + @loggedParamsString m

  # always returned the last argument passed in. That way you can:
  #     bar = foo # log foo's value in the middle of an expression, along with other values, without altering the rest of the expression
  #     bar = @log 1, 2, 3, foo
  Log.log = log = (args...) ->
    m = if args.length == 1
      args[0]
    else
      args
    stack = Foundation.callStack()
    Log.logCore m, stack, @name
    args[args.length-1]

  # same output as log, but returns the last value of the objects key-value pair
  # logL: labeled Log
  Log.logL = (obj) ->
    ret = null
    for k, v of obj
      ret = v
    log obj
    ret

  Log
