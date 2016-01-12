define [
  'art.foundation/src/art/dev_tools/test/art_chai'
  'lib/art/foundation/binary'
], (chai, Binary) ->
  assert = chai.assert

  pairs = [
    {s:"✓",  a:[0xE2, 0x9C, 0x93]},
    {s:"hi", a:[0x68, 0x69]},
    {s:"(ᵔᴥᵔ)", a:[40,225,181,148,225,180,165,225,181,148,41]},
    {s:"(╯°□°）╯︵ ┻━┻", a:[40,226,149,175,194,176,226,150,161,194,176,239,188,137,226,149,175,239,184,181,32,226,148,187,226,148,129,226,148,187]}
  ]

  suite "Art.Foundation.Binary.UTF8", ->
    test "array to str", ->
      for p in pairs
        assert.equal p.s, Binary.UTF8.toString(p.a)

    test "Uint8Array to str", ->
      for p in pairs
        assert.equal p.s, Binary.UTF8.toString(new Uint8Array p.a)

    test "Uint8Array to str", ->
      for p in pairs
        uint8Array = new Uint8Array p.a
        buffer = uint8Array.buffer
        assert.ok(buffer instanceof ArrayBuffer)
        assert.equal p.s, Binary.UTF8.toString buffer

    test "str to array", ->
      for p in pairs
        assert.deepEqual p.a, Binary.UTF8.toArray(p.s)

    test "round trip", ->
      for p in pairs
        assert.equal p.s, Binary.UTF8.toString(Binary.UTF8.toBuffer(p.s))

  "success"
