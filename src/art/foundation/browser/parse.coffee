module.exports = class Parse
  @query: (qs = self.location.search) ->
    obj = {}
    for pair in qs.replace('?', '').split('&')
      i = pair.indexOf '='
      key = pair.slice 0, i
      val = pair.slice i+1
      obj[key] = decodeURIComponent val if key.length > 0
    obj

  # returns undefined if not a legal url
  @url: (url) ->
    # http://www.w3.org/Addressing/URL/5_BNF.html
    m = url.match ///
      (([A-Za-z]+):(//)?)?      # protocol
      (([\-;&=\+\$,\w]+)(:([\-;:&=\+\$,\w]+))?@)?  # username:password@
      ([A-Za-z0-9\.\-]+)        # domain
      (:([0-9]+))?              # port
      (/[\+~%/\.\w\-]*)?        # pathName
      (\?([\-\+=&;%@\.\w,]*))?  # ?query
      (\#([\.\!\/\\\w]*))?      # #anchor
    ///
    return undefined unless m
    [
      _, _, protocol
      _, _, username
      _, password
      host
      _, port
      pathName
      _, query
      _, anchor
    ] = m

    if pathName
      a = pathName.split "/"
      fileName = a[a.length-1]
      path = (a.slice 0, a.length-1).join "/"

    host = host.toLowerCase()
    hostWithPort = host
    hostWithPort += ":#{port}" if port

    protocol: protocol
    username: username
    password: password
    hostWithPort: hostWithPort
    host: host
    port: port
    pathName: pathName
    path: path
    fileName: fileName
    query: query && Parse.query query
    anchor: anchor
