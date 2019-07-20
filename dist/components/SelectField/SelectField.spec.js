"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _SelectField = _interopRequireDefault(require("./SelectField"));

var Yup = _interopRequireWildcard(require("yup"));

describe('SelectField Component', function () {
  var options = [{
    value: 'manager',
    label: 'Manager'
  }];
  var props = {
    placeholder: 'Role',
    options: options,
    form: {
      values: {
        role: options[0]
      }
    },
    field: {
      name: 'role',
      type: 'select',
      placeholder: 'Role',
      options: options,
      schema: Yup.string().required('Required')
    }
  };
  var component = (0, _enzyme.mount)(_react["default"].createElement(_SelectField["default"], props));
  it('should render a SelectField', function () {
    expect(component.find('.SelectField').exists()).toEqual(true);
  });
  it('should render an input', function () {
    expect(component.find('input[name="role"]').exists()).toEqual(true);
  });
});