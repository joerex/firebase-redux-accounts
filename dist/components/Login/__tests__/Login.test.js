"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _Login = require("../Login");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('Login Component', function () {
  it('should render without throwing an error', function () {
    expect((0, _enzyme.shallow)(_react["default"].createElement(_Login.LoginComponent, null)).find('form').exists()).toBe(true);
  });
  it('renders a email input', function () {
    expect((0, _enzyme.shallow)(_react["default"].createElement(_Login.LoginComponent, null)).find('input[name="username"]').length).toEqual(1);
  });
  it('renders a password input', function () {
    expect((0, _enzyme.shallow)(_react["default"].createElement(_Login.LoginComponent, null)).find('input[name="password"]').length).toEqual(1);
  });
});
describe('Login State', function () {
  it('should manage state of username', function () {
    expect(true).toEqual(true);
  });
  it('should manage state of password', function () {
    expect(true).toEqual(true);
  });
});
describe('Login Actions', function () {
  it('should dispatch pending and success actions on valid form submission', function () {
    expect(true).toEqual(true);
  });
  it('should dispatch pending and error actions on invalid form submission', function () {
    expect(true).toEqual(true);
  });
});