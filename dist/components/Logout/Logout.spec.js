"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _Logout = require("./Logout");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('LogoutComponent', function () {
  var logout = jest.fn();
  var component = (0, _enzyme.shallow)(_react["default"].createElement(_Logout.LogoutComponent, {
    logout: logout
  }));
  it('should render a logout link', function () {
    expect(component.find('a').text()).toEqual('Logout');
  });
  it('should handle click', function () {
    component.find('a').simulate('click');
    expect(logout).toBeCalledTimes(1);
  });
});