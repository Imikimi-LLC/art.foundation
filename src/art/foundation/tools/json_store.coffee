ClassSystem = require '../class_system'
AsyncLocalStorage = require './AsyncLocalStorage'
{BaseObject} = ClassSystem
module.exports = class JsonStore extends BaseObject
  # store: localStorage or sessionStorage
  #   OR anything that implements the Async Storage interface (localStorage but returns promises):
  #     length
  #     key(index)
  #     getItem(key)
  #     setItem(key, value)
  #     removeItem(key)
  #     clear()
  constructor: (store = AsyncLocalStorage) ->
    @store = store

  setItem:    (k, v) -> @store.setItem k, JSON.stringify v
  getItem:    (k)    -> Promise.resolve(@store.getItem k).then (v) -> JSON.parse v
  removeItem: (k)    -> @store.removeItem k
  clear:             -> @store.clear()
  key:        (i)    -> @store.key i

  @getter length: -> @store.length
