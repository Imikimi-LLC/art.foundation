BaseObject = require "./base_object"
module.exports = class JsonStore extends BaseObject
  # store: localStorage or sessionStorage
  #   OR anything that the Storage interface:
  #     length
  #     key(index)
  #     getItem(key)
  #     setItem(key, value)
  #     removeItem(key)
  #     clear()
  constructor: (store = localStorage) ->
    @store = store

  setItem: (k, v) -> @store.setItem k, JSON.stringify v
  getItem: (k) -> JSON.parse @store.getItem k
  removeItem: (k) -> @store.removeItem k
  clear: -> @store.clear()
  key: (k) -> @store.key k

  @getter length: -> @store.length
