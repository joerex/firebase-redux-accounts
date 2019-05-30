"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _state = require("../../state");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(props) {
  var text = props.text,
      onSubmit = props.onSubmit,
      state = props.state;

  switch (state.status) {
    case _state.PENDING_STATE:
      return _react["default"].createElement("span", {
        className: "fa fa-spinner fa-spin"
      });

    default:
      return _react["default"].createElement("a", {
        onClick: function onClick() {
          return onSubmit();
        }
      }, text ? text : 'Logout');
  }
};

exports["default"] = _default;