{assert} = require 'art-foundation/src/art/dev_tools/test/art_chai'
Foundation = require "art-foundation"

parseURL = Foundation.Browser.Parse.url

if self.document
  suite "Art.Foundation.Browser.Parse", ->
    test "parseURL with just domain", ->
      a = parseURL "myDomain.com"
      assert.eq a,
        protocol: undefined
        username: undefined
        password: undefined
        hostWithPort: "mydomain.com"
        host:     "mydomain.com"
        port:     undefined
        pathName: undefined
        path:     undefined
        fileName: undefined
        query:    undefined
        anchor:   undefined

    test "parseURL with everything", ->
      a = parseURL "ftp://myName:myPassword@mySubDomain.myDomain.com:8080/myPath/myFile.html?param1=foo,bar&param2=baz#myAnchor"
      assert.eq a,
        protocol: "ftp"
        username: "myName"
        password: "myPassword"
        hostWithPort: "mysubdomain.mydomain.com:8080"
        host: "mysubdomain.mydomain.com"
        port: "8080"
        pathName: "/myPath/myFile.html"
        path: "/myPath"
        fileName: "myFile.html"
        query:
          param1: "foo,bar"
          param2: "baz"
        anchor: "myAnchor"
