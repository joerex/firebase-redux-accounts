"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _SubmitButton = _interopRequireDefault(require("./SubmitButton"));

describe('SubmitButton Component', function () {
  var text = 'Submit';
  var props = {
    onSubmit: jest.fn(),
    pending: false,
    text: text
  };
  var component = (0, _enzyme.shallow)(_react["default"].createElement(_SubmitButton["default"], props));
  it('should render a button with text', function () {
    expect(component.find('button.submit').text()).toEqual(text);
  });
  it('should render a spinner when pending', function () {
    component.setProps((0, _objectSpread2["default"])({}, props, {
      pending: true
    }));
    expect(component.find('span.fa-spinner.fa.fa-spin').exists()).toEqual(true);
  });
  it('should handle click', function () {
    var onSubmit = jest.fn();
    component.setProps((0, _objectSpread2["default"])({}, props, {
      onSubmit: onSubmit
    }));
    component.find('button.submit').simulate('click');
    expect(onSubmit).toBeCalledTimes(1);
  });
});