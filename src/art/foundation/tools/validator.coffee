StandardLib = require '../standard_lib'

{
  merge, log, BaseObject, shallowClone
  isNumber, isString, isPlainObject, isPlainArray
  Promise
  isBoolean
} = StandardLib

{BaseObject} = require '../class_system'

isId = (v) -> isString(v) && v.match ///^[-_a-z0-9]+$///i
isHexColor = (v) -> isString(v) && v.match /^#([a-f0-9]{3})|([a-f0-9]{6})/i

module.exports = class Validator extends BaseObject

  ###
  @dataTypes only includes the Standard Json types:
    except 'null':
      no field has the type of 'null'
      instead, it has some other type and can be 'null' unless it is 'required'
  ###
  @dataTypes: dataTypes =
    boolean:    validate: (a) -> isBoolean a
    number:     validate: (a) -> isNumber a
    string:     validate: (a) -> isString a
    object:     validate: (a) -> isPlainObject a
    array:      validate: (a) -> isPlainArray a

  booleanDataType = "boolean"
  numberDataType =  "number"
  stringDataType =  "string"
  objectDataType =  "object"
  arrayDataType =   "array"

  ###
  standard FieldType props:
    validate: (v) -> true/false
    preprocess: (v1) -> v2
    required: true/false
    type: one of @dataTypes, default: 'string'

  You can add your own, too, but they are ignored by this class.
  ###
  # fieldTypes are just easy, pre-defined Objects with the right properties:
  # Usage:
  #   This:           @fields webPage: @fieldTypes.id
  #   is the same as: @fields webPage: validate: (v) -> isId v
  #   and this:       @fields webPage: type: "id"
  @fieldTypes: fieldTypes =
    boolean:  type: booleanDataType
    number:   type: numberDataType
    string:   {}
    object:   type: objectDataType
    array:    type: arrayDataType

    count:    type: numberDataType

    id:
      required: true
      validate: (v) -> isId v

    date:
      validate:   (v) -> isString(v) || (v instanceof Date)
      preprocess: (v) -> if isString(v) then new Date v else v

    timestamp: # milliseconds since 1970; to get the current timestamp: Date.now()
      type: numberDataType
      validate:   (v) -> isNumber(v) || (v instanceof Date)
      preprocess: (v) -> if v instanceof Date then v - 0 else v

    color:
      validate: (v) -> isHexColor v

    email:
      validate: (v) -> isString(v) && v.trim().match emailRegexp
      preprocess: (v) -> v.trim().toLowerCase()

    url:
      validate: (v) -> isString(v) && v.match urlRegexp
      preprocess: (v) -> normalizeUrl v # downcase protocol and domain name

    trimmedString:
      preprocess: (v) -> v.trim()

  # apply defaults
  for k, v of fieldTypes
    v.type ||= stringDataType
    v.validate ||= dataTypes[v.type].validate

  constructor: (fieldDeclarationMap) ->
    @_fieldProps = {}
    @addFields fieldDeclarationMap

  addFields: (fieldDeclarationMap) ->
    for field, fieldOptions of fieldDeclarationMap
      @_addField field, fieldOptions

  ###
  OUT:
    promise.then (validatedPreprocessedFields) ->
    .catch (validationFailureInfoObject) ->
  ###
  preCreate: (fields) -> Promise.resolve().then => @preCreateSync fields

  ###
  OUT:
    promise.then (validatedPreprocessedFields) ->
    .catch (validationFailureInfoObject) ->
  ###
  preUpdate: (fields) -> Promise.resolve().then => @preUpdateSync fields

  preCreateSync: (fields) ->
    if @requiredFieldsPresent(fields) && @presentFieldsValid fields
      @preprocessFields fields
    else
      throw
        invalidFields: @invalidFields fields
        missingFields: @missingFields fields

  preUpdateSync: (fields) ->
    if @presentFieldsValid fields
      @preprocessFields fields
    else
      throw
        invalidFields: @invalidFields fields

  ####################
  # VALIDATION CORE
  ####################
  presentFieldsValid: (fields) ->
    for fieldName, {validate} of @_fieldProps when validate && (value = fields[fieldName])? && !validate value
      return false
    true

  requiredFieldsPresent: (fields) ->
    for fieldName, {required} of @_fieldProps when required && !(fields[fieldName]? || fields[required]?)
      return false
    true

  ####################
  # PREPROCESS CORE
  ####################
  preprocessFields: (fields) ->
    processedFields = null
    for fieldName, {preprocess} of @_fieldProps when preprocess && (value = fields[fieldName])?
      if (v = preprocess oldV = fields[fieldName]) != oldV
        processedFields ||= shallowClone fields
        processedFields[fieldName] = v
    processedFields || fields

  ####################
  # VALIDATION INFO CORE
  ####################
  missingFields: (fields) ->
    for fieldName, {required} of @_fieldProps when required && !(fields[fieldName]? || fields[required]?)
      fieldName

  invalidFields: (fields) ->
    for fieldName, {validate} of @_fieldProps when validate && (value = fields[fieldName])? && !validate value
      fieldName

  ###################
  # PRIVATE
  ###################
  _addField: (field, options) ->
    @_fieldProps[field] = merge null,
      fieldTypes[options.type]
      options
      if _instanceof = options.instanceof
        {validate} = options
        validate: (v) ->
          (v instanceof _instanceof) &&
          (!validate || validate v)
