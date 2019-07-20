"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _ForgotPassword = _interopRequireDefault(require("./ForgotPassword"));

var _views = require("../../state/views");

var mockProps = {
  state: {
    status: _views.ENABLED_STATE
  },
  onSubmit: function onSubmit() {}
};

var renderTests = function renderTests() {
  var component = (0, _enzyme.mount)(_react["default"].createElement(_ForgotPassword["default"], mockProps));
  it('should render an email input', function () {
    expect(component.find('input[name="email"]').exists()).toEqual(true);
  });
  it('should render a submit button', function () {
    expect(component.find('button.submit').length).toEqual(1);
  });
};

var stateTests = function stateTests() {
  var infoSelector = 'div.alert.alert-info';
  var successSelector = 'div.alert.alert-success';
  var mockSuccessState = {
    status: _views.ENABLED_STATE,
    success: true
  };
  var component = (0, _enzyme.shallow)(_react["default"].createElement(_ForgotPassword["default"], mockProps));
  it('should display info message or success message', function () {
    expect(component.find(infoSelector).exists()).toEqual(true);
    expect(component.find(successSelector).exists()).toEqual(false);
    component.setProps({
      state: mockSuccessState
    });
    expect(component.find(infoSelector).exists()).toEqual(false);
    expect(component.find(successSelector).exists()).toEqual(true);
  });
};

var errorTests = function errorTests() {
  var error = 'Houston, we have a problem';
  var selector = 'div.alert.alert-danger.error';
  var mockErrorState = {
    status: _views.ERROR_STATE,
    error: error
  };
  var component = (0, _enzyme.shallow)(_react["default"].createElement(_ForgotPassword["default"], mockProps));
  it('should display an error message from props', function () {
    expect(component.find(selector).exists()).toEqual(false);
    component.setProps({
      state: mockErrorState
    });
    expect(component.find(selector).text()).toEqual(error);
  });
};

var actionTests = function actionTests() {
  var resetPassword = jest.fn();
  var email = 'bob@gmail.com';
  var props = (0, _objectSpread2["default"])({}, mockProps, {
    onSubmit: function onSubmit() {
      return resetPassword(email);
    }
  });
  var component = (0, _enzyme.mount)(_react["default"].createElement(_ForgotPassword["default"], props));
  component.setState({
    email: email
  });
  it('should submit state', function () {
    component.find('button.submit').simulate('click', {
      preventDefault: jest.fn()
    });
    expect(resetPassword).toBeCalledWith(email);
  });
};

describe('ForgotPassword Component', function () {
  describe('Render', renderTests);
  describe('State', stateTests);
  describe('Errors', errorTests);
  describe('Actions', actionTests);
});