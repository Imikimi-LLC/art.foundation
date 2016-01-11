define [
  'namespace'
  './types'
], (Neptune, Types) ->
  {functionName} = Types

  class NeptuneCoffee
    @classPathArray: (object) =>
      klass = if object.class then object.class else object
      if klass.namespace && klass.namespace != Neptune && klass.namespace != Neptune.Lib
        array = try
          @classPathArray klass.namespace
        catch e
          console.error e
          []
        array.push klass.namespace
        array
      else
        []

    @classPath: (object) =>
      @classPathArray(object).map((a) => functionName a).join '.'

    @classPathName: (object) =>
      klass = if object.class then object.class else object
      @classPath(object) + "." + functionName klass
