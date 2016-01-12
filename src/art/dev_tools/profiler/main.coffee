define [
  './namespace'
  'art.foundation'
], (Profiler, Foundation) ->
  {BaseObject, inspect, clone, merge, Map} = Foundation

  flatten = Foundation.Array.flatten

  flattenPathCountsRecursive = (pathCounts, pathSoFar) ->
    a = for k,v of pathCounts when k != "count"
      r = flattenPathCountsRecursive v, pathSoFar.concat [k]
      r
    a.push count:pathCounts.count, path:pathSoFar if pathCounts.count
    flatten a

  blankNode = -> {count:0, callers:{}}
  Profiler.pathCounts = blankNode()
  Profiler.reset = -> Profiler.pathCounts = blankNode()

  Profiler.addPathCounts = (path) ->
    pathCounts = Profiler.pathCounts
    for v in path
      pathCounts = pathCounts.callers[v] ||= blankNode()
    pathCounts.count++

  Profiler.sample = ->
    cs = Foundation.callStack 1
    cleanCs = (csLine.fileWithLocation for csLine in cs)
    Profiler.addPathCounts cleanCs

  Profiler.flattenPathCounts = (pathCounts = Profiler.pathCounts) ->
    flattenPathCountsRecursive pathCounts, []

  Profiler.updateCounts = (pathCounts = Profiler.pathCounts) ->
    callers = pathCounts.callers
    keys = Object.keys callers
    return pathCounts.count if keys.length == 0
    count = 0
    count += Profiler.updateCounts callers[k] for k in keys
    pathCounts.count = count

  Profiler.compactR =
  Profiler.compact = (pathCounts = Profiler.pathCounts) ->

  # toArraysHelper = (callers)
  Profiler.toArrays = (pathCounts = Profiler.pathCounts) ->
    for k, v of pathCounts.callers
      keys = Object.keys v.callers
      if keys.length == 0
        [v.count, k, []]
      else if keys.length == 1
        r = Profiler.toArrays v
        rr = r[0]
        [rr[0], k, rr]
      else
        total = 0
        r = Profiler.toArrays v
        total+=rr[0] for rr in r
        r = r.sort (a,b) -> b[0] - a[0]
        [total, k, r]

  Profiler.toCompactArraysR = (arrays) ->
    for t in arrays
      ["#{t[0]} #{t[1]}"].concat (t[2] && Profiler.toCompactArraysR t[2]) || []

  Profiler.toCompactArrays = (arrays = Profiler.toArrays()) ->
    Profiler.toCompactArraysR arrays

  # Input structure
  #   count: #
  #   callers:
  #     sourceLocationA: recurse
  #     sourceLocationB: recurse
  # Intermediate Structure
  #  [count, locationA, [recurse]]
  #  [count, locationB, [recurse]]
  # Ouptut struture (sorted by # desc)
  #   "# #{sourceLocationA}": recurse
  #   "# #{sourceLocationB}": recurse


  # Profiler.callCounts = () ->
  #   children = (Profiler.callCounts vfor k,v of Profiler.pathCounts)

  Profiler.logAll = ->
    for v in Profiler.flattenPathCounts()
      Art.Foundation.Log.log v
