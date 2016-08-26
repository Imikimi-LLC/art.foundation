module.exports = class Ruby
  # would this be faster?: (a) -> a || a != 0

  @rubyTrue:  (a) -> a!=undefined && a!=null && a!=false
  @rubyFalse: (a) -> a==undefined || a==null || a==false

  @rubyOr: (a, b) ->
    if arguments.length == 2
      if a? then a else b
    else
      for a in arguments
        break if a?
      a
  @rubyAnd: (a, b) ->
    if arguments.length == 2
      if a? then b else a
    else
      for a in arguments
        break unless a?
      a

  @reopenInstanceProps: (klass, instanceProps) ->
    klass::[k] = v for own k, v of instanceProps

  @reopenClassProps: (klass, classProps) ->
    klass[k] = v for own k, v of classProps
