{rawLog} = require "./log"
{nextTick} = require "./async"

console.log "SequencedEventManager is depricated."

class EventStackNode
  constructor: (eventFunction, options, parent)->
    @catch = options?.catch
    @parent = parent
    @eventFunction = eventFunction
    @nextSubNode = null
    @lastSubNode = null
    @nextPeer = null
    @done = false
    @started = false

  addSubNode: (node) ->
    node.parent = @
    if !@lastSubNode
      # if @parent && @parent.lastSubNode == @
      #   # tail recursion detected
      #   # This works in my artificial tests, but doesn't work in perf.html... ???
      #   @parent.addSubNode node
      # else
        @lastSubNode = @nextSubNode = node
    else
      @lastSubNode.nextPeer = node
      @lastSubNode = node

  queue: (eventFunction, options) ->
    @addSubNode new EventStackNode eventFunction, options

  evaluateFunction: ->
    try
      SequencedEventManager.currentNode = @
      @eventFunction()
    catch error
      SequencedEventManager.throw error

  topmostParent: ->
    parent = @
    parent = parent.parent while parent.parent
    parent

  notDoneParent: ->
    parent = @parent
    parent = parent.parent while parent && parent.done
    parent

  # return null if done
  unstartedSelfOrChild: ->
    return @ if !@started
    return null if @done
    @nextSubNode = @nextSubNode.nextPeer while @nextSubNode && !result = @nextSubNode.unstartedSelfOrChild()
    if result
      result
    else
      @done = true
      null

  unstartedParentOrChild: ->
    result = null
    while !result && notDoneParent = @notDoneParent()
      result = notDoneParent.unstartedSelfOrChild()
    result

  nextUnstartedNode: ->
    @unstartedSelfOrChild() || @unstartedParentOrChild()

  next: ->
    @nextUnstartedNode()?.start()

  start: ->
    @started = true
    @done = false
    @evaluateFunction()
    true

  inspectStructure: ->
    result = if !@eventFunction then ""
    else if @done then "d"
    else if @started then "s"
    else "p"

    if @nextSubNode
      node = @nextSubNode
      result+="(#{node.inspectStructure()}"
      result+=", #{node.inspectStructure()}" while node = node.nextPeer
      result+")"
    else
      result

module.exports = class SequencedEventManager
  @currentNode: null
  @resetIds: ->
    EventStackNode.resetIds()

  @queue: (eventFunction, options={}) ->
    @scheduleNextTick()
    unless @currentNode
      @currentNode = new EventStackNode
      @currentNode.started = true
    @currentNode.queue eventFunction, options

  @inspectStructure: ->
    @currentNode && @currentNode.topmostParent().inspectStructure()

  ###
  User should not call methods below directly
  private:
  ###

  @throw: (error) ->
    while @currentNode
      if @currentNode.catch
        @currentNode.done = true
        @currentNode.catch error
        return
      else
        @currentNode = @currentNode.parent
    rawLog "SequencedEventManager. Uncaught exception: #{error.name}"
    rawLog error
    throw error

  @next: ->
    @currentNode = @currentNode.parent while @currentNode?.done
    if @currentNode
      @currentNode.next()
    else
      @rootNode = @currentNode = null
      rawLog "SequencedEventManager.next: everything is already done!"
      false

  @scheduleNextTick: ->
    unless @nextTickScheduled
      @nextTickScheduled = true
      nextTick =>
        @nextTickScheduled = false
        @next()
        if @currentNode?.nextUnstartedNode()
          @scheduleNextTick()
        else
          @currentNode = null

###
each time we execute a user eventFunction, we push an item onto the stack
each time we finish a eventFunction we execute the next eventFunction - which is always the next eventFunction of the most recent stack-node
we only pop stack nodes when all eventFunctions have been executed
###
