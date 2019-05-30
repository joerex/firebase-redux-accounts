"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactSelect = _interopRequireDefault(require("react-select"));

require("./SelectField.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    return _objectSpread({}, _theme, {
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