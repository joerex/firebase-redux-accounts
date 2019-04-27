"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _SelectField = _interopRequireDefault(require("./SelectField"));

var Yup = _interopRequireWildcard(require("yup"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('SelectField Component', function () {
  var options = [{
    value: 'manager',
    label: 'Manager'
  }];
  var props = {
    placeholder: 'Role',
    options: options,
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