"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(props) {
  var onSubmit = props.onSubmit,
      pending = props.pending,
      text = props.text;
  return _react["default"].createElement("button", {
    disabled: pending,
    onClick: onSubmit,
    className: "btn btn-block btn-brand submit"
  }, pending ? _react["default"].createElement("span", {
    className: "fa fa-spinner fa-spin"
  }) : _react["default"].createElement("span", null, text));
};

exports["default"] = _default;