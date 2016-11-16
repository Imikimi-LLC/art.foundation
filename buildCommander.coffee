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
