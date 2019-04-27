"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _SubmitButton = _interopRequireDefault(require("./SubmitButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    component.setProps(_objectSpread({}, props, {
      pending: true
    }));
    expect(component.find('span.fa-spinner.fa.fa-spin').exists()).toEqual(true);
  });
  it('should handle click', function () {
    var onSubmit = jest.fn();
    component.setProps(_objectSpread({}, props, {
      onSubmit: onSubmit
    }));
    component.find('button.submit').simulate('click');
    expect(onSubmit).toBeCalledTimes(1);
  });
});