"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _reactSelect = _interopRequireDefault(require("react-select"));

require("./SelectField.css");

var _default = function _default(_ref) {
  var options = _ref.options,
      field = _ref.field,
      form = _ref.form,
      placeholder = _ref.placeholder;
  var value = form.values[field.name];

  var onChange = function onChange(option) {
    form.setFieldValue(field.name, option);
  };

  var theme = function theme(_theme) {
    return (0, _objectSpread2["default"])({}, _theme, {
      borderRadius: 0
    });
  };

  return _react["default"].createElement(_reactSelect["default"], {
    className: "SelectField",
    theme: theme,
    options: options,
    name: field.name,
    value: value,
    onChange: onChange,
    onBlur: field.onBlur,
    placeholder: placeholder
  });
};

exports["default"] = _default;