define [
  "./namespace"
  "./string"
], (Binary) ->
  binary = Binary.binary

  Binary.stream = (arg) ->
    if arg instanceof Binary.Stream
      arg
    else if arg instanceof ArrayBuffer
      Binary.Stream.from_array_buffer arg
    else if arg instanceof Uint8Array
      new Binary.Stream arg
    else
      new Binary.Stream(binary(arg).bytes)

  class Binary.Stream

    @from_array_buffer = (array_buffer) ->
      new Binary.Stream(new Uint8Array(array_buffer, 0, array_buffer.byteLength))

    constructor: (byte_view) ->
      @byte_view = byte_view
      @pos = 0

    read_byte: ->
      @byte_view[@pos++]

    read_asi: ->
      debug = @inspect()
      ret = 0
      shift = 0
      val = 128
      while val >= 128
        val = @read_byte()
        ret += (val % 128) << shift
        shift += 7
      ret

    uint8Array: ->
      @byte_view

    read: (length) ->
      begin = @pos
      @pos += length
      end = @pos
      new Binary.Stream @byte_view.subarray begin, end

    inspect: ->
      "{Binary.Stream pos=#{@pos} byteOffset=#{@byte_view.byteOffset} length=#{@byte_view.length}}"

    read_asi_string: ->
      @read @read_asi()

    done: ->
      @pos >= @byte_view.length

    toString: ->
      binary(@byte_view).toString()
      #String.fromCharCode.apply(null, @byte_view)
      #Array.prototype.slice.call(@byte_view).join("")
