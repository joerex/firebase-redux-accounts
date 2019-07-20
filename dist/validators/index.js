"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateEmail = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

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
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(email, settings) {
    var endpoint, request, response;
    return _regenerator["default"].wrap(function _callee$(_context) {
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