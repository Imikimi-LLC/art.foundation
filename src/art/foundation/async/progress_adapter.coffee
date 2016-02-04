{isNumber, isFunction, isArray} = require '../types'
BaseObject = require '../base_object'
{log} = require '../log'
{max, min} = Math

module.exports = class ProgressAdapter extends BaseObject

  ###
  IN:
    stepWeights can be a positive integer or an aray of positive, real numbers.

      integer N: specifies progress will be made in N even steps from 0 to 1

      array of numbers A: specifies progress will be made in A.length steps which
        may not be even. Each step has its own "weight."

        Example: stepWeights = [850, 50, 100]
        Will become:
          steps:
            0: 0.00 to 0.85
            1: 0.85 to 0.90
            2: 0.90 to 1.00

        Example: stepWeights = [1, 2, 1]
        Will become:
          steps:
            0: 0.00 to 0.25
            1: 0.25 to 0.75
            2: 0.75 to 1.00

    progressCallback: progressCallback is a function which is invoked with a number
      between 0 and 1. It is invoked immediatly with 0, then it is invoked by makeProgress()
      and makeProgressCallback()(). It always increments or stays the same. It will
      never go backwards.

  ###
  constructor: (@stepWeights, @progressCallback) ->
    throw new Error "invalid params" unless isFunction(@progressCallback) && (isArray(@stepWeights) || isNumber(@stepWeights))
    @_currentStep = 0
    @_generateSteps()
    @_currentProgress = 0
    @setCurrentProgress 0

  @getter "steps currentStep currentProgress",
    currentProgressPercent: -> "#{@_currentProgress * 100 | 0}%"

  @setter
    currentProgress: (p) ->
      @progressCallback? min 1, @_currentProgress = max p, @_currentProgress

  makeProgress: ->
    if @_currentStep + 1 >= @_steps.length
      console.warn "ProgressAdapter: makeProgress/Callback called too many times!",
        currentStep: @_currentStep
        steps: @_steps
        stepWeights: @stepWeights

    @setCurrentProgress @_steps[@_currentStep++] || 1

  makeProgressCallback: ->
    rangeStart = @_steps[@_currentStep-1] || 0
    rangeEnd = @_steps[@_currentStep++] || 1
    (progress) => @setCurrentProgress rangeStart + (rangeEnd - rangeStart) * progress

  ##################
  # PRIVATE
  ##################

  _generateSteps: ->
    if isNumber numSteps = @stepWeights
      @_steps = for i in [0...numSteps] by 1
        (i + 1) / numSteps
    else
      total = 0
      total += w for w in @stepWeights

      step = 0
      @_steps = for w in @stepWeights
        step += w / total

