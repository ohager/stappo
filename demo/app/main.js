// stappo comes as class...so we need to instantiate it
// using a class would allow to keep several instances, e.g. for domain separation
var StappoClass = require('stappo')
window.stappo = new StappoClass()
require('./demo.tag')
riot.mount('demo')
