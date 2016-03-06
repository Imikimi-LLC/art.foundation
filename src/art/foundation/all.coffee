Array        = require "./array"
Async        = require "./async"
BaseObject   = require "./base_object"
CallStack    = require "./call_stack"
Clone        = require "./clone"
Eq           = require "./eq"
Foundation   = require "./namespace"
Function     = require "./function"
Hash         = require "./hash"
Inspect      = require "./inspect"
Log          = require "./log"
Map          = require "./map"
Math         = require "./math"
Promise      = require "./promise"
Regexp       = require "./regexp"
Ruby         = require "./ruby"
ShallowClone = require "./shallow_clone"
String       = require "./string"
Time         = require "./time"
Types        = require "./types"
WebWorker    = require "./web_worker"
PFileReader  = require './promised_file_reader'

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
  select BaseObject, "createWithPostCreate", "mixInto", "createAllClass", "createHotWithPostCreate"
  select Inspect, "inspect", "inspectLean", "miniInspect"
  Array
  Async
  CallStack
  Clone
  Eq
  Function
  GlobalCounts
  Hash
  Log
  Math
  PFileReader
  Regexp
  Ruby
  ShallowClone
  String
  Time
  Types
  WebWorker
