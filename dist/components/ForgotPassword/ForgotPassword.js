"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _SubmitButton = _interopRequireDefault(require("../SubmitButton/SubmitButton"));

var _views = require("../../state/views");

var ForgotPasswordComponent =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(ForgotPasswordComponent, _Component);

  function ForgotPasswordComponent() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, ForgotPasswordComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(ForgotPasswordComponent)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      email: ''
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleSubmit", function (event) {
      event.preventDefault();

      _this.props.onSubmit(_this.state.email);
    });
    return _this;
  }

  (0, _createClass2["default"])(ForgotPasswordComponent, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var state = this.props.state;
      var email = this.state.email;
      var statusMessage = state.success ? _react["default"].createElement("div", {
        className: "alert alert-success"
      }, "A password reset link has been sent to your email.") : _react["default"].createElement("div", {
        className: "alert alert-info"
      }, "Enter your email to have a password reset link sent to your email.");

      var errorMessage = state.status === _views.ERROR_STATE && _react["default"].createElement("div", {
        className: "alert alert-danger error"
      }, state.error);

      return _react["default"].createElement("div", {
        className: "ForgotPassword accounts-form center-form"
      }, statusMessage, _react["default"].createElement("form", null, _react["default"].createElement("input", {
        name: "email",
        type: "text",
        value: email,
        onChange: function onChange(e) {
          return _this2.setState({
            email: e.target.value
          });
        },
        placeholder: "Email"
      }), _react["default"].createElement(_SubmitButton["default"], {
        onSubmit: function onSubmit(e) {
          return _this2.handleSubmit(e);
        },
        pending: state.status === _views.PENDING_STATE,
        text: "Send Reset Link"
      }), errorMessage));
    }
  }]);
  return ForgotPasswordComponent;
}(_react.Component);

exports["default"] = ForgotPasswordComponent;