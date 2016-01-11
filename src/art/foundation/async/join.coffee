define [
  "../base_object"
  "./basic"
], (BaseObject, Basic) ->
  {nextTick} = Basic

  class Join extends BaseObject
    constructor: (onJoin)->
      super
      @onJoin = onJoin
      @results = []
      @functions = []
      @resultsPending = 0

    join: (onJoin) ->
      @onJoin = onJoin
      @queueStart() unless @startQueued

    # "f" should accept a function "g" which you call with the result you want to capture
    # ex:
    #   joiner = new Join
    #   for v in list
    #     do (v) =>
    #       joiner.do (done)->
    #         asyncJob (result)->
    #           done result
    #   joiner.join (results) -> ...
    do: ->
      throw new Error "already started" if @started
      @functions.push f for f in arguments
      @queueStart() unless @startQueued

    # internal
    queueStart: ->
      @startQueued = true
      nextTick => @start()

    start: ->
      return @onJoin @results if @functions.length == 0
      @started = true
      @results = new Array(@functions.length)
      @resultsPending = @functions.length
      for f, resultIndex in @functions
        do (f, resultIndex) =>
          if f.length > 0
            f (result) => @jobDone resultIndex, result
          else
            @jobDone resultIndex, f()

    jobDone: (resultIndex, result) ->
      @results[resultIndex] = result
      @resultsPending--

      if @resultsPending == 0
        @onJoin @results
