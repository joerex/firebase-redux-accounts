"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ResetPasswordComponent = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _state = require("../../state");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ResetPasswordComponent =
/*#__PURE__*/
function (_Component) {
  _inherits(ResetPasswordComponent, _Component);

  function ResetPasswordComponent() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ResetPasswordComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ResetPasswordComponent)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      password: '',
      resetToken: ''
    });

    return _this;
  }

  _createClass(ResetPasswordComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.token = this.props.token;
      this.forceUpdate();
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(event) {
      event.preventDefault();
      updatePassword(this.props.dispatch, {
        password: this.state.password,
        token: this.token
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react["default"].createElement("div", {
        className: "reset-password center-form"
      }, !this.props.updatePasswordSuccess && this.token && _react["default"].createElement("div", {
        className: "alert alert-info"
      }, "Enter a new password."), this.props.updatePasswordSuccess && _react["default"].createElement("div", {
        className: "alert alert-success"
      }, "Your password has been reset."), !this.token && _react["default"].createElement("div", {
        className: "alert alert-danger"
      }, "There is no token."), _react["default"].createElement("form", {
        onSubmit: this.handleSubmit
      }, _react["default"].createElement("input", {
        name: "password",
        type: "password",
        value: this.state.password,
        onChange: function onChange(e) {
          return _this2.setState({
            password: e.target.value
          });
        },
        placeholder: "Password"
      }), _react["default"].createElement("input", {
        type: "submit",
        value: "Reset Password",
        className: "btn btn-block btn-brand",
        disabled: !this.token
      }), this.props.failedAttempts > 0 && _react["default"].createElement("span", {
        className: "alert alert-danger"
      }, "Incorrect username or password", this.props.error && _react["default"].createElement("span", {
        className: "error"
      }, this.props.error))));
    }
  }]);

  return ResetPasswordComponent;
}(_react.Component);

exports.ResetPasswordComponent = ResetPasswordComponent;

var _default = (0, _reactRedux.connect)(function (state) {
  var authState = (0, _state.getAuthState)(state);
  return {
    failedResetAttempts: (0, _state.getAuthFailedAttempts)(authState),
    error: (0, _state.getAuthError)(authState),
    updatePasswordSuccess: (0, _state.getAuthUpdatePasswordSuccess)(authState)
  };
}, function (dispatch) {
  return {
    dispatch: dispatch
  };
})(ResetPasswordComponent);

exports["default"] = _default;