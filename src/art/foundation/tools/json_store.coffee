{log, Promise, isNumber} = require '../standard_lib'
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
    log JsonStore: store: store
    @store = store

  setItem:    (k, v) -> Promise.then => @store.setItem k, JSON.stringify v
  getItem:    (k)    -> Promise.resolve(@store.getItem k).then (v) => JSON.parse v
  removeItem: (k)    -> Promise.then => @store.removeItem k
  clear:             -> Promise.then => @store.clear()
  key:        (i)    -> Promise.then => @store.key i

  getLength:         -> Promise.then => if isNumber @store.length then @store.length else @store.getLength()
