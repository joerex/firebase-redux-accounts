"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _ResetPassword = _interopRequireDefault(require("./ResetPassword"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var renderTests = function renderTests() {
  var component = (0, _enzyme.shallow)(_react["default"].createElement(_ResetPassword["default"], null));
  it('should render a password input', function () {
    expect(component.find('input[name="password"]').exists()).toEqual(true);
  });
};

describe('ResetPassword Component', function () {
  describe('Render', renderTests);
});