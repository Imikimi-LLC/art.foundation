module.exports = class Regexp
  # http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address

  urlProtocolRegexp = '[\\w-]+://'
  domainRegexp = '[\\w]+(?:-[\\w]+)*(?:\\.[\\w]+(?:-[\\w]+)*)*\\.[a-z]{2,20}'
  urlPathRegexp = '(?:/(?:[-+*._\\w]|%[a-f\\d]{2})*)*'
  urlQueryRegexp = '(?:[-=+*._\\w]|%[a-f\\d]{2})*'

  @emailRegexp: ///^([_\w-]+(?:\.[_\w]+)*)@(#{domainRegexp})$///i

  @numberRegexp: /([-]?\.[0-9]+)|([-]?[0-9]+(\.[0-9]+)?)/

  @urlProtocolRegexp: ///^#{urlProtocolRegexp}$///i
  @domainRegexp:      ///^#{domainRegexp}$///i
  @urlPathRegexp:     ///^#{urlPathRegexp}$///i
  @urlQueryRegexp:    ///^#{urlQueryRegexp}$///i

  @isoDateRegexp: /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/

  @hex16ColorRegex:   /^#([a-f0-9])([a-f0-9])([a-f0-9])([a-f0-9])?$/i
  @hex256ColorRegex:  /^#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})?$/i
  @rgbColorRegex:     /rgb *\( *(\d+%?) *, *(\d+%?) *, *(\d+%?) *\)/
  @rgbaColorRegex:    /rgba *\( *(\d+%?) *, *(\d+%?) *, *(\d+%?) *, *(\d*\.?\d*)\)/

  @colorRegex:  new RegExp "(#{@hex16ColorRegex.source})|(#{@hex256ColorRegex.source})|(#{@rgbColorRegex.source})|(#{@rgbaColorRegex.source})"

  @urlRegexp: ///
    ^
    (#{urlProtocolRegexp})
    (#{domainRegexp})
    (#{urlPathRegexp})?
    (?:\?(#{urlQueryRegexp}))?
    $
    ///i
