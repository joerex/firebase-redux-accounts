"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _Register = _interopRequireDefault(require("./Register"));

var Yup = _interopRequireWildcard(require("yup"));

var _formik = require("formik");

var _views = require("../../state/views");

var mockProps = {
  fields: [{
    name: 'email',
    type: 'text',
    placeholder: 'Email',
    schema: Yup.string().required('Required'),
    initialValue: 'bob@gmail.com'
  }],
  state: {
    status: _views.ENABLED_STATE
  },
  onSubmit: function onSubmit() {}
};

var renderTests = function renderTests() {
  var component = (0, _enzyme.mount)(_react["default"].createElement(_Register["default"], mockProps));
  it('should render an email input', function () {
    expect(component.find('input[name="email"]').exists()).toEqual(true);
  });
  it('should render a submit button', function () {
    expect(component.find('button.submit').length).toEqual(1);
  });
};

var stateTests = function stateTests() {
  var successSelector = 'div.alert.alert-success';
  var mockSuccessMessage = {
    status: _views.ENABLED_STATE,
    success: true
  };
  var component = (0, _enzyme.shallow)(_react["default"].createElement(_Register["default"], mockProps));
  it('should display success message', function () {
    expect(component.find(successSelector).exists()).toEqual(false);
    component.setProps({
      state: mockSuccessMessage
    });
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
  var component = (0, _enzyme.mount)(_react["default"].createElement(_Register["default"], mockProps));
  it('should display an error message from props', function () {
    expect(component.find(selector).exists()).toEqual(false);
    component.setProps({
      state: mockErrorState
    });
    expect(component.find(selector).text()).toEqual(error);
  });
};

var actionTests = function actionTests() {
  var action = jest.fn();
  var props = (0, _objectSpread2["default"])({}, mockProps, {
    onSubmit: function onSubmit(a, _ref) {
      var resetForm = _ref.resetForm;
      resetForm();
    }
  });
  var component = (0, _enzyme.mount)(_react["default"].createElement(_Register["default"], props));
  it('should handle submit', function () {
    component.find(_formik.Formik).props().onSubmit({
      email: ''
    }, {
      resetForm: action
    });
    expect(action).toBeCalledTimes(1);
  });
};

describe('Register Component', function () {
  describe('Render', renderTests);
  describe('State', stateTests);
  describe('Errors', errorTests);
  describe('Actions', actionTests);
});