# https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays

# should look into using: https://developer.mozilla.org/en-US/docs/Code_snippets/StringView?redirectlocale=en-US&redirectslug=Web%2FJavaScript%2FTyped_arrays%2FStringView
define [
  "./namespace"
], (Binary) ->

  class Binary.UTF8
    # string -> Uint8Array representing bytes in UTF8 string
    @toBuffer = (string) ->
      new Uint8Array @toArray(string)

    # string -> array of integers representing bytes in UTF8 string
    @toArray = (string) ->
      uriEncoded = encodeURIComponent string
      i = 0
      while i < uriEncoded.length
        char = uriEncoded.charCodeAt i++
        if char == 0x25 #%
          i += 2
          parseInt(uriEncoded.substr(i - 2, 2), 16)
        else
          char

    # Input can be one of:
    #   array of intergers
    #   Uint8Array representing bytes in UTF8 string -> string
    #
    @toString = (a) ->
      return "<undefined>" if a == undefined
      return "<null>" if a == null
      try
        a = new Uint8Array(a) if a instanceof ArrayBuffer
        decodeURIComponent (for x in a
          y = x.toString 16
          y = "0" + y if y.length < 2
          "%" + y
        ).join ''
      catch error
        return "<#{a.length} binary bytes>"
