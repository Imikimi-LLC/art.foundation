{assert} = require 'art-foundation/src/art/dev_tools/test/art_chai'
{Map, inspect} = require "art-foundation"

{
  isArray
  isString
  isFunction
  isPlainObject
  isClass
  isObject
  objectName
  isBrowserObject
  present
  isPromise
  Map
} = require "art-foundation"

suite "Art.Foundation.StandardLib.Types", ->
  test "isPromise Promise.resolve()", -> assert.eq true, isPromise Promise.resolve()
  test "isPromise Promise.reject()", -> assert.eq true, isPromise Promise.reject()
  test "isPromise 1 is false", -> assert.eq false, isPromise 1
  test "isPromise {} is false", -> assert.eq false, isPromise {}

  test "isArray [] is true", -> assert.eq true, isArray []
  test "isArray Int8Array is true", -> assert.eq true, isArray new Int8Array(4)
  test "isArray arguments is false", -> assert.eq false, isArray arguments
  test "isArray - non arrays are false", ->
    assert.eq false, isArray()
    assert.eq false, isArray null
    assert.eq false, isArray undefined
    assert.eq false, isArray {}
    assert.eq false, isArray "foo"
    assert.eq false, isArray 123

  test "isString 'foo' is true", -> assert.eq true, isString "foo"
  test "isString - non strings are false", ->
    assert.eq false, isString()
    assert.eq false, isString null
    assert.eq false, isString undefined
    assert.eq false, isString 123
    assert.eq false, isString {}
    assert.eq false, isString []
    assert.eq false, isString ->

  test "isFunction(->) is true", -> assert.eq true, isFunction(->)
  test "isFunction(class Foo) is true", -> assert.eq true, isFunction(class Foo)
  test "isFunction - non functions are false", ->
    assert.eq false, isFunction()
    assert.eq false, isFunction null
    assert.eq false, isFunction undefined
    assert.eq false, isFunction 123
    assert.eq false, isFunction {}
    assert.eq false, isFunction []
    assert.eq false, isFunction "foo"

  test "isPlainObject {} is true", -> assert.eq true, isPlainObject {}
  test "isPlainObject(new class Foo) is false", -> assert.eq false, isPlainObject new class Foo
  test "isPlainObject - non plain objects are false", ->
    assert.eq false, isPlainObject()
    assert.eq false, isPlainObject null
    assert.eq false, isPlainObject undefined
    assert.eq false, isPlainObject 123
    assert.eq false, isPlainObject "foo"
    assert.eq false, isPlainObject []
    assert.eq false, isPlainObject ->

  test "isClass empty-class is false - only class we can't detect correctly", ->
    assert.eq false, isClass class Foo

  test "isClass non-empty-class is true", ->
    assert.eq true, isClass class Foo
      bar: 0

  test "isClass empty-class derived class is true", ->
    class Foo
    assert.eq true, isClass class Bar extends Foo

  test "isClass non-empty-class derived class is true", ->
    class Foo
      baz: 0
    assert.eq true, isClass class Bar extends Foo

  test "isClass - non class objects are false", ->
    assert.eq false, isClass()
    assert.eq false, isClass null
    assert.eq false, isClass undefined
    assert.eq false, isClass 123
    assert.eq false, isClass "foo"
    assert.eq false, isClass []
    assert.eq false, isClass {}
    assert.eq false, isClass ->

  test "isObject {} is true", -> assert.eq true, isObject {}
  test "isObject new class Foo is true", -> assert.eq true, isObject new class Foo
  test "isObject class Foo is false", -> assert.eq false, isObject class Foo
  test "isObject [] is false", -> assert.eq false, isObject []
  test "isObject null is false", -> assert.eq false, isObject null
  test "isObject -> is false", -> assert.eq false, isObject ->

  test "isObject - non objects are false", ->
    assert.eq false, isObject()
    assert.eq false, isObject undefined
    assert.eq false, isObject 123
    assert.eq false, isObject "foo"

  test "objectName new Class Foo == 'Foo'", ->
    class Foo
    assert.eq "Foo", objectName new Foo

  test "objectName Class Foo = 'Foo'", ->
    class Foo
    assert.eq "Foo", objectName Foo

  test "objectName -> == 'function'", ->
    assert.eq 'function', objectName ->

  test "objectName {} == 'Object'", ->
    assert.eq 'Object', objectName {}

  test "objectName 123 == 'Number'", ->
    assert.eq 'Number', objectName 123

  test "objectName 'foo' == '123'", ->
    assert.eq 'String', objectName 'foo'

  test "objectName null == 'null'", ->
    assert.eq 'null', objectName null

  test "objectName undefined == 'undefined'", ->
    assert.eq 'undefined', objectName undefined

  test "objectName new Map == 'Art.Foundation.StandardLib.ClassSystem.Map'", ->
    assert.eq 'Neptune.Art.Foundation.StandardLib.ClassSystem.Map', objectName new Map

  test "objectName Map == 'Art.Foundation.StandardLib.ClassSystem.Map'", ->
    assert.eq 'Neptune.Art.Foundation.StandardLib.ClassSystem.Map', objectName Map

suite "Art.Foundation.StandardLib.Types.present", ->

  test "present strings", ->
    assert.eq false, present ''
    assert.eq 'jh', present 'jh'

  test "present null, undefined, false", ->
    assert.eq true, present true
    assert.eq false, present false
    assert.eq false, present null
    assert.eq false, present undefined

  test "present numbers", ->
    assert.eq 0, present 0
    assert.eq 0.5, present 0.5
    assert.eq 1, present 1
    assert.eq -1, present -1

  test "present custom", ->
    o1 = present: -> true
    o2 = present: -> false
    assert.eq o1, present o1
    assert.eq false, present o2

  test "returnIfNotPresent value", ->
    assert.eq "hi", present false, "hi"
    assert.eq "hi", present "", "hi"

