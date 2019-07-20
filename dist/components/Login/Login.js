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

var LoginComponent =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(LoginComponent, _Component);

  function LoginComponent() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, LoginComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(LoginComponent)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      email: '',
      password: ''
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleSubmit", function (event) {
      event.preventDefault();

      _this.props.onSubmit({
        email: _this.state.email,
        password: _this.state.password
      });
    });
    return _this;
  }

  (0, _createClass2["default"])(LoginComponent, [{
    key: "handleInputChange",
    value: function handleInputChange(event) {
      if (this.props.state.status === _views.ERROR_STATE && this.props.clearError) {
        this.props.clearError();
      }

      this.setState((0, _defineProperty2["default"])({}, event.target.name, event.target.value));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          email = _this$state.email,
          password = _this$state.password;
      var state = this.props.state;

      var errorMessage = state.status === _views.ERROR_STATE && _react["default"].createElement("div", {
        className: "alert alert-danger error"
      }, state.error);

      return _react["default"].createElement("div", {
        className: "accounts-form center-form"
      }, _react["default"].createElement("form", null, _react["default"].createElement("input", {
        name: "email",
        type: "text",
        value: email,
        onChange: function onChange(e) {
          return _this2.handleInputChange(e);
        },
        placeholder: "Email"
      }), _react["default"].createElement("input", {
        name: "password",
        type: "password",
        value: password,
        onChange: function onChange(e) {
          return _this2.handleInputChange(e);
        },
        placeholder: "Password"
      }), _react["default"].createElement(_SubmitButton["default"], {
        text: "Login",
        onSubmit: function onSubmit(e) {
          return _this2.handleSubmit(e);
        },
        pending: state.status === _views.PENDING_STATE
      }), errorMessage));
    }
  }]);
  return LoginComponent;
}(_react.Component);

exports["default"] = LoginComponent;