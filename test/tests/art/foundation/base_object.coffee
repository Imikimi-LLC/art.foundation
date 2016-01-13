{assert} = require 'art.foundation/src/art/dev_tools/test/art_chai'
Foundation = require "art.foundation"
{BaseObject, clone, eq, inspect, nextTick} = Foundation

suite "Art.Foundation.BaseObject#tap", ->
  test "tap", ->
    class Foo extends BaseObject
      constructor: (a) -> @a = a

    foo = new Foo 123
    bar = foo.tap ->
      foo.a += 2

    assert.eq bar, foo
    assert.eq foo.a, 125

suite "Art.Foundation.BaseObject class helpers", ->
  test "include", ->
    class ToInclude
      @f: -> 10
      f: -> 1

    class IncludeInto extends BaseObject
      @g: -> 20
      g: -> 2
      @include ToInclude

    v = new IncludeInto
    assert.equal v.g(), 2
    assert.equal v.f(), 1
    assert.equal IncludeInto.g(), 20
    assert.equal IncludeInto.f(), 10

  test "include shadowing", ->
    class ToInclude
      f: -> 1

    class IncludeInto extends BaseObject
      f: -> 2
      @include ToInclude

    v = new IncludeInto
    assert.equal v.f(), 2

  test "getter", ->
    class Foo extends BaseObject
      @getter 'x': -> @y * 2

    f = new Foo
    f.y = 10
    assert.equal f.x, 20

  test "getter with [] access", ->
    class Foo extends BaseObject
      @getter 'x': -> @y * 2

    f = new Foo
    f.y = 10
    assert.equal f["x"], 20

  test "getter inheritance", ->
    class Foo extends BaseObject
      @getter 'x': -> @y * 2

    class Bar extends Foo

    f = new Bar
    f.y = 10
    assert.equal f.x, 20

  test "setter", ->
    class Foo extends BaseObject
      @setter 'x': (v) -> @y = v / 2

    f = new Foo
    f.x = 10
    assert.equal f.y, 5



  test "property", ->
    class Foo extends BaseObject
      @property "x"

    f = new Foo
    f.x = 123
    assert.equal f.x, 123
    assert.equal f._x, 123

  test "property with initializer", ->
    class Foo extends BaseObject
      @property x:456

    f = new Foo
    assert.equal f._x, undefined
    assert.equal f.x, 456
    assert.equal f._x, 456
    f.x = 123
    assert.equal f.x, 123
    assert.equal f._x, 123

