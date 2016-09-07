module.exports = buildCommander = (options) ->
  {log} = require 'art-foundation'
  {actions, beforeActions} = options
  commander = require "commander"
  {version, name} = options.package
  commander.version "#{name} v#{version}"

  actionTaken = false
  for k, v of actions
    do (k, v) ->
      action = if v.constructor == Object
        {params, action} = v
        command = "#{k} #{params}" if params
        action
      else
        command = k
        v

      commander
      .command command
      .action (a...)->
        [args..., __] = a
        log action: k, arguments: args
        # console.log a
        actionTaken = true

        Promise.resolve beforeActions()
        .then -> action a...
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
