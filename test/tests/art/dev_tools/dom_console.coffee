Foundation = Neptune.Art.Foundation
{log, inspectLean, inspect, isPlainArray, timeout} = Foundation
if self.document
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
    testLog
      foo: Promise.resolve a:12, b:13
      bar: timeout(10).then -> 456
    testLog
      foo: Promise.reject(123)
      bar: Promise.resolve(456)
    # a.catch -> 123
    null
