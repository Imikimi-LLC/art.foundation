define [
  "./namespace"
  "./inspect"
  "./types"
  "./log"
  "./eq"
  "./clone"
  "./shallow_clone"
  "./map"
  "./call_stack"
  "./time"
  "./string"
  "./math"
  "./base_object"
  "./array"
  "./regexp"
  "./hash"
  "./function"
  "./async"
  "./ruby"
  "./promise"

  "./web_worker"
], (Foundation, Inspect, Types, Log, Eq, Clone, ShallowClone, Map, CallStack, Time, String, Math, BaseObject, Array, Regexp, Hash, Function, Async, Ruby, Promise, WebWorker) ->
  {createAllClass} = BaseObject
  {select} = Hash

  class GlobalCounts
    {isPlainObject} = Types
    {currentSecond} = Time
    # for debugging - a quick way to count things
    Foundation.globalCounts = globalCounts = {}
    globalTime = null
    @resetGlobalCounts: ->
      globalTime = currentSecond()
      Foundation.globalCounts = globalCounts = {}
    @globalCount: (name, amount = 1) ->
      if isPlainObject amount
        if last = globalCounts[name]
          for k, v of amount
            last[k] += v
        else
          globalCounts[name] = amount
      else
        globalCounts[name] = (globalCounts[name]||0) + amount
    @countStep: ->
      nextTime = currentSecond()
      if nextTime - globalCount > .002
        console.error "gap"
      globalCount = nextTime
      Foundation.globalCount "step"

  createAllClass Foundation,
    select BaseObject, "createWithPostCreate", "mixInto", "createAllClass"
    select Inspect, "inspect", "inspectLean", "miniInspect"
    GlobalCounts
    Array
    Ruby
    CallStack
    Clone
    ShallowClone
    Eq
    Hash
    Log
    Math
    Regexp
    String
    Time
    Types
    Function
    Async
    WebWorker
