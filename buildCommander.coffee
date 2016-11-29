###
TODO - guess what? I'm going to build my own Commander.

What I want:

1) I want to be able to add "commands" which each have their own options:

  cli myCommand -zyx

2) I want fully automatic single-letter assignment.

3) I want common options across commands (--verbose)

4) I want a nice, declarative API.

  a) uses Validator

  artCommander
    loadData:
      help: "load test data"
      options:
        # validator declaration
        # validator is exclusive - if it's not here, it's an error.
        parallel: "boolean"

        # args is special - it's all the arguments which are not -/-- options.
        # It is an array of strings.
        args: validate: (v) -> v.length > 1

      # options is a plain object with all the options
      action: (options) ->
        {parallel, args} = options

5) I want a sane and automatic way of handling "help"

###
{lowerCamelCase, getCodeWords} = require 'neptune-namespaces/NeptuneLib'

module.exports = buildCommander = (options) ->
  {actions, beforeActions} = options
  commander = require "commander"
  {version, name} = options.package
  commander.version "#{name} v#{version}"
  commander.option "-v, --verbose"

  actionTaken = false
  letterAssignments = {}
  actionsToLetters = {}
  assignLetters = (offset = 0) ->
    allAssigned = true
    for k, v of actions when !actionsToLetters[k]
      if letter = getCodeWords(k)[offset]?.slice(0, 1)?.toLowerCase()
        if letterAssignments[letter]
          allAssigned = false
        else
          letterAssignments[letter] = k
          actionsToLetters[k] = letter
    unless allAssigned
      assignLetters offset + 1
  assignLetters()

  for k, v of actions
    do (k, v) ->
      commandName = lowerCamelCase k
      action = if v.constructor == Object
        {params, action, help} = v
        command = "--#{commandName} #{params}" if params
        action
      else
        command = "--#{commandName}"
        v


      if letter = actionsToLetters[k]
        command = "-#{letter}, #{baseCommand = command}"

      commander
      .option command, help
      .on commandName, (a...)->
        console.log "exec: #{commandName}..."
        {log, merge} = require 'art-foundation'
        actionTaken = true

        Promise.resolve beforeActions? commander
        .then (beforeActionsOptions) -> action merge beforeActionsOptions, args: a
        .then  (out) -> log success: out
        .catch (err) ->
          log error: err
          console.error err

  commander
  .parse process.argv

  unless actionTaken
    console.error "No command given."
    commander.outputHelp()
    process.exit 1
