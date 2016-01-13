mocha = require("mocha")
// mocha.setup('tdd');

global.suite = describe
global.suiteSetup = beforeEach
global.setup = before
global.teardown = after
global.suiteTeardown = afterEach
global.test = it
require('coffee-script/register');
require('./tests');
// require('./art/foundation/batch_loader');
// require('./art/foundation/call_stack');
// require('./art/foundation/clone');
// require('./art/foundation/eq');
// require('./art/foundation/epoch');
// require('./art/foundation/base_object');
// require('./art/foundation/hash');
// require('./art/foundation/json_store');
// require('./art/foundation/map');
// require('./art/foundation/math');
// require('./art/foundation/plain_data');
