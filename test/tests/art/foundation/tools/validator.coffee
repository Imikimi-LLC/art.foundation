Foundation = Neptune.Art.Foundation
{Validator, isString, log} = Foundation

suite "Art.Foundation.Tools.Validator", ->
  test "new Validator", ->
    new Validator

suite "Art.Foundation.Tools.Validator.declaration types", ->
  test "type: 'id'", ->
    v = new Validator
      id: type: "id"

    assert.rejects v.preCreate {}
    .then -> v.preUpdate {}
    .then -> v.preCreate id: "123"
    .then -> assert.rejects v.preCreate id: 123

  test "validate: ->", ->
    v = new Validator
      id: validate: (v) -> isString v

    v.preCreate {}
    .then -> v.preUpdate {}
    .then -> v.preCreate id: "123"
    .then -> assert.rejects v.preCreate id: 123

  test "preprocess: ->", ->
    v = new Validator
      id: preprocess: (v) -> "#{v}a"

    Promise.resolve()
    .then ->
      v.preUpdate id: "123"
      .then ({id}) -> assert.eq id, "123a"

    .then ->
      v.preUpdate id: 456
      .then ({id}) -> assert.eq id, "456a"

  test "required: true", ->
    v = new Validator
      id: required: true

    v.preCreate id: 123
    .then -> assert.rejects v.preCreate id: null
    .then -> v.preUpdate id: null
    .then -> v.preUpdate id: 123

  test "instanceof: Foo", ->
    class Foo
    class Bar extends Foo
    v = new Validator
      foo: instanceof: Foo

    log null_instanceof: null instanceof Foo

    Promise.resolve()
    .then -> v.preCreate foo: new Foo
    .then -> v.preCreate foo: new Bar
    .then -> v.preCreate foo: null
    .then -> assert.rejects v.preCreate foo: {}
