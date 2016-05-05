module.exports = class StringCase

  @capitalize: (str) ->
    str.charAt(0).toUpperCase() + str.slice 1

  @decapitalize: (str) ->
    str.charAt(0).toLowerCase() + str.slice 1

  # lowerCamelCase or snake_case to UpperCamelCase
  @upperCamelCase: (str) =>
    (@capitalize word for word in str.split '_').join ""

  # UpperCamelCase or snake_case to lowerCamelCase
  @lowerCamelCase: (str) =>
    words = str.split '_'
    "#{@decapitalize words[0]}#{(@capitalize words[i] for i in [1...words.length]).join ""}"

  # UpperCamelCase or lowerCamelCase to snake_case
  @snakeCase: (str) =>
    (word.toLowerCase() for word in str.split /(?=[A-Z])/).join "_"
