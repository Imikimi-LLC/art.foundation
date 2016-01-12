mocha = require("mocha")
// mocha.setup('tdd');

global.suite = describe
global.test = it
require('coffee-script/register');
require('./art/foundation/array');
