isBrowser = !!(typeof window != 'undefined' && typeof navigator != 'undefined' && window.document)
return unless isWebWorker = !isBrowser && typeof importScripts != 'undefined'

importScripts "/neptune/extlib/require.js"
require.config baseUrl: "/neptune"

require [
  "lib/art/foundation"
], (Foundation) ->
  {log, WorkerRpc} = Foundation
  self.log = log
  log "worker: worker_for_worker_rpc_tests started"
  self.WorkerRpc = WorkerRpc

  {workerRpc} = WorkerRpc

  WorkerRpc.register
    HelloTest: hello: (name) -> "Hello, #{name}."
    InvokeBackTestWorkerHalf: invokeBack: (value) ->
      WorkerRpc.lastMessageReceivedFrom.InvokeBackTestBrowserHalf.result value

  workerRpc.bind
    InvokeBackTestBrowserHalf: ["result"]
    Setup: ["ready"]

  workerRpc.Setup.ready()
