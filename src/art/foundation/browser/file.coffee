{createElementFromHtml} = require './dom'

module.exports = class File

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
    @hiddenDivForFileInput = createElementFromHtml "<div style='height: 0px;width: 0px; overflow:hidden; position:absolute;'/>"
    body = document.body
    fileInput = createElementFromHtml "<input type='file' #{'accept='+options.accept if options.accept} #{'multiple=true' if options.multiple}/>"
    @hiddenDivForFileInput.appendChild fileInput
    body.appendChild @hiddenDivForFileInput
    fileInput.onchange = (e) ->
      fileList = (file for file in fileInput.files)
      fileTypes = (file.type for file in fileList)
      fileSizes = (file.size for file in fileList)
      options.onChange && options.onChange fileList
    fileInput.click()
