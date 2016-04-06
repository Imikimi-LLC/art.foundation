StandardLib = require '../standard_lib'
{log, Promise} = StandardLib

module.exports = class Basic
  @timeout: timeout = (ms, f) =>
    new Promise (resolve) ->
      setTimeout ->
        f?()
        resolve()
      , ms

  @requestAnimationFrame:
    self.requestAnimationFrame       ||
    self.webkitRequestAnimationFrame ||
    self.mozRequestAnimationFrame    ||
    self.oRequestAnimationFrame      ||
    self.msRequestAnimationFrame     ||
    # console.error "requestAnimationFrame not supported!"
    (f) -> setTimeout f, 1000 / 60

  #-------------------------------------
  # nextTick
  #-------------------------------------
  # @setupNextTickProcessor: =>
  #   return if @nextTickProcessor
  #   lastOnMessage = self.onmessage
  #   @nextTickProcessor = self.onmessage = =>
  #     @evalAndThrowErrorsOutOfStack lastOnMessage if lastOnMessage
  #     if @nextTickList.length > 0
  #       next = @nextTickList[0]
  #       @evalAndThrowErrorsOutOfStack next
  #       @nextTickList = @nextTickList.slice 1
  #       if @nextTickList.length > 0
  #         self.postMessage null, '*'

  # @nextTickList: []
  @nextTick: (f) =>
    timeout 0, f
    # @nextTickList.push f
    # @setupNextTickProcessor()
    # self.postMessage null, '*'

  #-------------------------------------
  # throwErrorOutOfStack
  #-------------------------------------
  @throwErrorOutOfStack: (e) => timeout 0, -> throw e
  @evalAndThrowErrorsOutOfStack: (f) =>
    try
      f()
    catch e
      console.error e.stack
      @throwErrorOutOfStack e
