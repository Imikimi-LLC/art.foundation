{log, Promise, isNumber} = require 'art-standard-lib'
ClassSystem = require '../ClassSystem'
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
  constructor: (store = AsyncLocalStorage) -> @store = store

  setItem:    (k, v) -> Promise.then => @store.setItem k, JSON.stringify v
  getItem:    (key)    ->
    Promise.resolve(@store.getItem key).then (jsonValue) =>
      Promise.then -> jsonValue && JSON.parse jsonValue
      .catch (error) ->
        log.error JsonStore: {key, jsonValue, error}
        throw error

  removeItem: (k)    -> Promise.then => @store.removeItem k
  clear:             -> Promise.then => @store.clear()
  key:        (i)    -> Promise.then => @store.key i

  getLength:         -> Promise.then => if isNumber @store.length then @store.length else @store.getLength()
