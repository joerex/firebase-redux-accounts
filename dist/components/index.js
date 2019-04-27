"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ForgotPassword = exports.Register = exports.Logout = exports.Login = void 0;

var _Login = _interopRequireDefault(require("./Login/Login"));

var _Logout = _interopRequireDefault(require("./Logout/Logout"));

var _Register = _interopRequireDefault(require("./Register/Register"));

var _ForgotPassword = _interopRequireDefault(require("./ForgotPassword/ForgotPassword"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Login = _Login["default"];
exports.Login = Login;
var Logout = _Logout["default"];
exports.Logout = Logout;
var Register = _Register["default"];
exports.Register = Register;
var ForgotPassword = _ForgotPassword["default"];
exports.ForgotPassword = ForgotPassword;