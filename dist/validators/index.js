"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateEmail = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var API_ROOT = process.env.REACT_APP_API_ROOT || '';
/***
 * Validate email
 * @param email
 * @param settings
 * @returns {Promise<*>}
 */

var validateEmail =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(email, settings) {
    var endpoint, request, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            endpoint = settings.endpoint.validateEmail || '/validateEmail';
            _context.next = 4;
            return fetch(API_ROOT + endpoint, {
              method: 'POST',
              body: JSON.stringify({
                email: email
              }),
              headers: {
                'Content-Type': 'application/json'
              }
            });

          case 4:
            request = _context.sent;
            _context.next = 7;
            return request.json();

          case 7:
            response = _context.sent;
            return _context.abrupt("return", response.message);

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", _context.t0);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 11]]);
  }));

  return function validateEmail(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.validateEmail = validateEmail;