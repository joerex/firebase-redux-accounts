"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _Logout = _interopRequireDefault(require("./Logout"));

var _views = require("../../state/views");

var logout = jest.fn();
var mockProps = {
  state: {
    status: _views.ENABLED_STATE
  },
  onSubmit: function onSubmit() {
    logout();
  }
};
describe('LogoutComponent', function () {
  var component = (0, _enzyme.shallow)(_react["default"].createElement(_Logout["default"], mockProps));
  it('should render a logout link', function () {
    expect(component.find('a').text()).toEqual('Logout');
  });
  it('should handle click', function () {
    component.find('a').simulate('click');
    expect(logout).toBeCalledTimes(1);
  });
});