Promise = self.Promise || require 'es6-promise'

###
ArtPromise extends ES6 Promises in the following ways:

- constructing a promise with no parameters is allowed
- promise.resolve and promise.reject are supported as
  alternative ways to resolve or reject a promise

If native promises are supported, they are used,
otherwise a polyfill is used.

###
module.exports = class ArtPromise #extends Promise
  @all: Promise.all
  @race: Promise.race
  @reject: Promise.reject
  @resolve: Promise.resolve

  constructor: (_function)->
    @resolve = @reject = null
    @_nativePromise = null
    @_nativePromise = new Promise (@resolve, @reject) =>
      _function? @resolve, @reject

  then: (a, b) -> @_nativePromise.then a, b
  catch: (a) -> @_nativePromise.catch a

