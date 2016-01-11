define [
  "../inspect"
  "../log"
  "./rest_client"
  "./string"
], (Inspect, Log, RestClient, BinaryString) ->

  {inspect} = Inspect
  {log} = Log
  {binary}  = BinaryString

  class EncodedImage
    @get: (url, callBack, errorBack = null) ->
      image = new Image
      ###
      NOTE: This crossOrigin setting makes file:// urls not work with WkWebKit
      image.crossOrigin = "Anonymous"

      Odly, everything currently seems to work without it. I thought it was required to request
      remote images. I'm leaving it commented out here in case we have future problems. It is
      possible we could included it only if the url is not a file:// url.
      ###
      image.onload = -> callBack image
      image.onerror = (e) ->
        self.encodedImageErrorEvent = e
        console.log "EncodedImage.get error START"
        console.log "self.encodedImageErrorEvent = e"
        console.log e
        console.log e.currentTarget
        console.log e.target
        console.log image
        console.log "image status"
        console.log image.status
        console.log "EncodedImage.get error END"
        errorBack e

      # must specify src last or crossOrigin won't get set on Safari.
      image.src = url

    # data can be a data URI or
    # data can be any type Binary.String.binary accepts
    # callback is called with the resulting Image object and the data in URI format.
    @toDataURI: (data, callBack, errorBack) ->
      if data instanceof self.File
        reader = new FileReader
        reader.readAsDataURL data
        reader.onerror = errorBack
        reader.onload = (e) =>
          dataURI = e.target.result
          @toDataURI dataURI, callBack, errorBack
        return
      dataURI = if (typeof data) == "string" && data[0..4] == "data:"
        data
      else
        throw new Error("data must be set") unless data
        "data:image/png;base64," + binary(data).toBase64()

      errorBack ||= (error) ->
        log "WARNING - Image loading failed. Error was not handled.\nbuffer: #{inspect data}"

      callBack dataURI

    @toImage: (data, callBack, errorBack) ->
      @toDataURI data, (dataURI)->
        image = new Image
        image.src = dataURI
        image.onload = -> callBack image, dataURI
        image.onerror = errorBack
      , errorBack
