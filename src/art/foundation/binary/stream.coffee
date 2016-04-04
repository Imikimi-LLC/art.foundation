Binary   = require "./namespace"
{binary} = require "./binary_string"

Binary.stream = (arg) ->
  if arg instanceof Binary.Stream
    arg
  else if arg instanceof ArrayBuffer
    Binary.Stream.fromArrayBuffer arg
  else if arg instanceof Uint8Array
    new Binary.Stream arg
  else
    new Binary.Stream(binary(arg).bytes)

module.exports = class Stream

  @fromArrayBuffer = (arrayBuffer) ->
    new Binary.Stream new Uint8Array arrayBuffer, 0, arrayBuffer.byteLength

  constructor: (byteView) ->
    @byteView = byteView
    @pos = 0

  readByte: ->
    @byteView[@pos++]

  readAsi: ->
    debug = @inspect()
    ret = 0
    shift = 0
    val = 128
    while val >= 128
      val = @readByte()
      ret += (val % 128) << shift
      shift += 7
    ret

  uint8Array: ->
    @byteView

  read: (length) ->
    begin = @pos
    @pos += length
    end = @pos
    new Binary.Stream @byteView.subarray begin, end

  inspect: ->
    "{Binary.Stream pos=#{@pos} byteOffset=#{@byteView.byteOffset} length=#{@byteView.length}}"

  readAsiString: ->
    @read @readAsi()

  done: ->
    @pos >= @byteView.length

  toString: ->
    binary(@byteView).toString()
