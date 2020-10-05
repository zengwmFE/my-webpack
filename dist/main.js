(function(modules){
        function __require__(filename){
            var fn = modules[filename];
            var module = {
                exports: {}
            };
            fn(__require__,module,module.exports);
            return module.exports
        }
        __require__('/Users/ming4ulquora/Desktop/simplePack/src/index.js')
      })({'/Users/ming4ulquora/Desktop/simplePack/src/index.js': function(require,module,exports){"use strict";

var _greeting = require("./greeting.js");

document.write((0, _greeting.greeting)('Jane'));},'./greeting.js': function(require,module,exports){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.greeting = greeting;
function greeting(name) {
  return 'hello' + name;
}},})