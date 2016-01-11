define [
  "../base_object"
  "./basic"
], (BaseObject, Basic) ->
  {nextTick} = Basic

  class Sequence extends BaseObject
    constructor: ->
      super
      @toExecute = []
      @resultIndex = 0
      @results = []
      @nextQueued = false

    # "f" should accept a function "g" which you call with the result you want to capture
    # ex:
    #   inOrder = new Sequence
    #   inOrder.do (previusResult)->
    #     syncJob previusResult # compute a syncronous task using the previous result and return a result
    #   for v in list
    #     do (v) =>
    #       # passing in a function taking 2 args to do signals an async task; call done with results when done
    #       inOrder.do (previusResult, done)->
    #         asyncJob previusResult, (result)->
    #           done result
    #   joiner.join (results) -> ...
    do: ->
      for f in arguments
        if f.length > 0
          @addAsyncFunction f
        else
          @addSyncFunction f
      @executeNext()

    join: (f)->
      for f in arguments
        if f.length > 0
          @addAsyncJoinFunction f
        else
          @addJoinFunction f
      @executeNext()

    # internal
    addAsyncFunction: (f)->
      i = @resultIndex++
      @toExecute.push =>
        f (result) =>
          @results[i] = result
          @executeNext()
          result

    addSyncFunction: (f)->
      i = @resultIndex++
      @toExecute.push =>
        @results[i] = f()
        @executeNext()

    addJoinFunction: (f)->
      @toExecute.push =>
        f @results
        @executeNext()

    addAsyncJoinFunction: (f)->
      @toExecute.push =>
        f @results, =>
          @executeNext()

    executeNext: ->
      return if @nextQueued
      @nextQueued = true
      nextTick =>
        @nextQueued = false
        if @toExecute.length > 0
          next = @toExecute[0]
          @toExecute = @toExecute.slice 1
          next()
