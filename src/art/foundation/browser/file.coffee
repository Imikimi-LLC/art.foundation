# https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input

define [
  "extlib/jquery"
  "./namespace"
], ($, Browser) ->

  class Browser.File

    # options
    #   accept: the HTML file input accept options. I.E. <input type="file" accept="...">
    #     HTML "accept" values:
    #       [valid MIME types]
    #       audio/*
    #       video/*
    #       image/*
    #   multiple: if set to true, allow the user to select multiple files
    #   onChange: ([files]) -> ... # function called when the user makes a selection. Returns an array of HTML File objects
    #     https://developer.mozilla.org/en-US/docs/Web/API/File
    @request: (options={}) ->
      if @hiddenDivForFileInput
        @hiddenDivForFileInput.detach()
      @hiddenDivForFileInput = $ "<div style='height: 0px;width: 0px; overflow:hidden; position:absolute;'/>"
      body = $ "body"
      fileInput = $ "<input type='file' #{'accept='+options.accept if options.accept} #{'multiple=true' if options.multiple}/>"
      fileInput.appendTo @hiddenDivForFileInput
      @hiddenDivForFileInput.appendTo body
      fileInput.change (e) ->
        fileList = (file for file in fileInput[0].files)
        fileTypes = (file.type for file in fileList)
        fileSizes = (file.size for file in fileList)
        options.onChange && options.onChange fileList
      fileInput.click()
