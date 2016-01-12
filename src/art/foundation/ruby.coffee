module.exports = class Ruby
  # would this be faster?: (a) -> a || a != 0

  @rubyTrue:  (a) -> a!=undefined && a!=null && a!=false
  @rubyFalse: (a) -> a==undefined || a==null || a==false

  @rubyOr: (a, b) -> if a? then a else b
  @rubyAnd: (a, b) -> if a? then b else a

  @reopenInstanceProps: (klass, instanceProps) ->
    klass::[k] = v for own k, v of instanceProps

  @reopenClassProps: (klass, classProps) ->
    klass[k] = v for own k, v of classProps
