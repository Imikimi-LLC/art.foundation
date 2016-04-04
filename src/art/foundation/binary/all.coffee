{createAllClass} = require '../base_object'

Binary = require './namespace'
Stream = require "./stream"

createAllClass Binary,
  stream: Stream.stream
