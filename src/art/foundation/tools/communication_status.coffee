###
A core set of status-codes that code can reason about easily.

Goal:

  Minimal set of codes so APIs can reason about network requests in a
  consistant way.

Why not HTTP Status codes?

  They cover so much, most of which automatic code cannot do anything about
  other than report an error, possibly to be viewed by a human later.

My strategy is to have a small, simple set of status codes for our programs to
reason about, and, if necessary, allow the communication channel to return
additional information in the form of a 'message' that humans can look at to
get more information about any failures.

Note, these status-codes are used at the core of other Art Libs:

  ArtFlux
  ArtEry

Possible additional statuses to add:

  (only add if we have a very good use-case that requires it)

  temporaryFailure: code can retry in a bit and it might work then

  redirect: request can only be fulfilled at the new location

    Note, I don't think we should have different statuses for all the  various
    redirect semantics. It's up to the API to determine if a redirect is
    temporary or permanent. I could imagine an API which returns a
    redirectAddress  string as well as a connonicalAddress.

###
module.exports = class CommunicationStatus
  ###
  status: success

  * An unqualified success.
  * I guess it could be qualified, with additional information in another field,
    but the 'expected' data should be present.
  ###
  @success:  "success"

  ###
  status: pending

  * The request is proceeding.
  * No errors so far.
  ###
  @pending:  "pending"

  ###
  status: missing

  * The request was properly formatted.
  * There were no network errors.
  * There were no server errors.
  * The only problem is the server could not find the requested resource.
  ###
  @missing:  "missing"

  ###
  status: failure

  * All network and server errors.
  * Provide additional information in 'message' or 'error' parameter.
  ###
  @failure:  "failure"

  ###
  OUT: true if status is a valid status-string
  ###
  @validStatus: (status) -> CommunicationStatus[status] == status
