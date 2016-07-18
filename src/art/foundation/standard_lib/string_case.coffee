{compactFlatten} = require './array_compact_flatten'
module.exports = class StringCase

  @capitalize: (str) ->
    str.charAt(0).toUpperCase() + str.slice 1

  @decapitalize: (str) ->
    str.charAt(0).toLowerCase() + str.slice 1

  @getCodeWords: (str) ->
    _words = str.match /[a-zA-Z][a-zA-Z0-9]*/g
    return [] unless _words
    words = for word in _words
      word.match /[A-Z]+[a-z0-9]*|[a-z0-9]+/g

    # Neptune.Art.Foundation.log
    #   getCodeWords:
    #     _words: _words
    #     words: words
    compactFlatten words

  @getLowerCaseCodeWords: (str) =>
    word.toLowerCase() for word in @getCodeWords str

  # lowerCamelCase or snake_case to UpperCamelCase
  @upperCamelCase: (str) =>
    (@capitalize word for word in @getLowerCaseCodeWords str).join ""

  # UpperCamelCase or snake_case to lowerCamelCase
  @lowerCamelCase: (str) =>
    words = @getLowerCaseCodeWords str
    "#{@decapitalize words[0]}#{(@capitalize word for word in words.slice 1).join ""}"

  # UpperCamelCase or lowerCamelCase to snake_case
  @snakeCase: (str) =>
    (@getLowerCaseCodeWords str).join "_"
