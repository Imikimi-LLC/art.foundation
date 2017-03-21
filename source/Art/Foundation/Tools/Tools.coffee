module.exports = [
  [(require './ProgressAdapter'), "executePromiseSequence"]
  require './WebWorker'
  require './GlobalCounts'
  CommunicationStatus: require "art-communication-status"
  RestClient: require "art-rest-client"
  require 'art-object-tree-factory'
]
