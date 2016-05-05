Foundation = require 'art-foundation'
{log, inspectLean, inspect, isPlainArray} = Foundation
suite "Art.DevTools.DomConsole", ->
  testLog = (args...) ->
    info = if args.length == 1
      if isPlainArray args[0]
        inspect args[0]
      else
        inspectLean args[0]
    else
      inspectLean args
    test "log #{info}", ->
      log args...

  testLog "a string"
  testLog []
  testLog [1]
  testLog [1,2,3]
  testLog {}
  testLog {a:1}
  testLog {a:1,b:2,c:3}
  testLog "#ffff00"
  testLog colorLikeString: "#ffff00"
  image = document.createElement "img"
  image.src = "https://upload.wikimedia.org/wikipedia/en/2/24/Lenna.png"
  testLog image: image
