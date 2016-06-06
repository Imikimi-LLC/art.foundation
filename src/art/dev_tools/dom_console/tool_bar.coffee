
###
To customize how an object shows up in the DOM console, add
getInspectObjects member method. For more info, see base_object.coffee
###

Foundation = require 'art-foundation'
DomConsole = require './namespace'
{Component} = require './pseudo_react'

{
  BaseObject
  createWithPostCreate
  wordsArray
} = Foundation

{Div, A} = Foundation.Browser.DomElementFactories

module.exports = createWithPostCreate class ToolBar extends Component

  render: ->
    {shown} = @state
    Div
      style:
        display: "flex"
        flexDirection: "row"
        borderBottom: "1px solid #aaa"
      Div style: margin: "5px", "dom console"
      for action in ["reset", "show", "hide"]
        do (action) =>
          Div
            style: margin: "5px"
            A
              href: "#"
              on: click: => DomConsole[action]()
              action
