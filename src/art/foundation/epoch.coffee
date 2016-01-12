Foundation = require './namespace'
BaseObject = require './base_object'
Async = require      "./async"
Inspect = require    "./inspect"
Promise = require    "./promise"
{requestAnimationFrame, evalAndThrowErrorsOutOfStack} = Async
{inspect} = Inspect

# The basic Epoch assumes each item is a function. The function is invoked when the epoch cycles.
# You can inherit and overrid processEpochItems if you want to queue and process different items.
# The first item queued queues the next epoch. Subsequent items are added to a list to be processed in the pending epoch.
# All items queued are processed when the next epoch is processed, on the next animation frame.
module.exports = class Epoch extends BaseObject
  constructor: (options={})->
    super
    @_emptyQueueAfterProcessing = !!options.emptyQueueAfterProcessing
    @_queuedItems = []
    @_nextReadyQueue = []
    @_epochQueued = false
    @_processingEpoch = false
    @_epochCount = 0

  @propGetter "processingEpoch", "epochQueued", "epochCount", "emptyQueueAfterProcessing"
  @getter
    epochLength: -> @_queuedItems.length + @_nextReadyQueue.length

  updateGlobalCounts: ->
    Foundation.globalCount "#{@class.name}_queuedItems", @_queuedItems.length
    Foundation.globalCount "#{@class.name}_nextReadyQueue", @_nextReadyQueue.length

  # This guarantess there will be a next "ready" event.
  # If there were no setStates this epoch, then there won't be a next "ready" - unless you use this method.
  onNextReady: (f) ->
    if f
      throw new Error "not a function: #{inspect f}" unless typeof f is "function"
      @queueNextEpoch() unless @_processingEpoch
      @_nextReadyQueue.push f
    else
      new Promise (resolve) => @_nextReadyQueue.push -> resolve()

  _ready: ->
    return unless (nrq = @_nextReadyQueue).length > 0
    @_nextReadyQueue = []
    for f in nrq
      evalAndThrowErrorsOutOfStack => f()

  # item can be anything
  # null items are ignored and not queued (a NOOP)
  queueItem: (item) ->
    if item
      @_queuedItems.push item
      @queueNextEpoch()
    item

  isItemQueued: (item) -> item in @_queuedItems

  queueNextEpoch: ->
    unless @_epochQueued
      @_epochQueued = true
      requestAnimationFrame =>
        @_epochQueued = false
        @processEpoch()

  flushEpochNow: -> @processEpoch()

  processEpoch: ->
    @_processingEpoch = true
    items = @_queuedItems

    if @_emptyQueueAfterProcessing
      @processEpochItemsWithErrorHandling items
      @_queuedItems = []
    else
      @_queuedItems = []
      @processEpochItemsWithErrorHandling items

    @_processingEpoch = false
    @_epochCount++
    @_ready()

  processEpochItemsWithErrorHandling: (items)->
    evalAndThrowErrorsOutOfStack =>
      @processEpochItems items

  #################################
  # OVERRIDES (required)
  # If you are implementing an Epoch class, you must implement the following method(s)
  #################################

  # each time the epoch is processed, this is called with all the queued items
  processEpochItems: (items)->
    item() for item in items

