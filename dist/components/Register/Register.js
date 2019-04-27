"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.RegisterComponent = void 0;

var _react = _interopRequireWildcard(require("react"));

var _formik = require("formik");

var Yup = _interopRequireWildcard(require("yup"));

var _SelectField = _interopRequireDefault(require("../SelectField/SelectField"));

var _state = require("../../state");

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _SubmitButton = _interopRequireDefault(require("../SubmitButton/SubmitButton"));

require("./Register.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RegisterComponent = function RegisterComponent(props) {
  var error = props.error,
      token = props.token,
      registerSuccess = props.registerSuccess,
      successMessage = props.successMessage,
      redirect = props.redirect,
      uid = props.uid,
      fields = props.fields,
      action = props.action,
      dispatch = props.dispatch,
      pending = props.pending;
  var fieldComponents = fields.map(function (field, i) {
    return _react["default"].createElement("div", {
      key: i
    }, (field.type === 'text' || field.type === 'email' || field.type === 'password') && _react["default"].createElement(_react.Fragment, null, _react["default"].createElement(_formik.Field, {
      name: field.name,
      placeholder: field.placeholder,
      type: field.type,
      validate: field.validate
    }), _react["default"].createElement(_formik.ErrorMessage, {
      name: field.name,
      component: "div",
      className: "alert alert-danger"
    })), field.type === 'select' && _react["default"].createElement(_react.Fragment, null, _react["default"].createElement(_formik.Field, {
      name: field.name,
      component: _SelectField["default"],
      options: field.options,
      placeholder: field.placeholder,
      validate: field.validate
    }), _react["default"].createElement(_formik.ErrorMessage, {
      name: field.name,
      component: "div",
      className: "alert alert-danger"
    })));
  }); // validation schema

  var shape = fields.reduce(function (accumulator, field) {
    if (field.schema) {
      return _objectSpread({}, accumulator, _defineProperty({}, field.name, field.schema));
    } else {
      return accumulator;
    }
  }, {});
  var schema = Yup.object().shape(shape);
  var initialValues = fields.reduce(function (accumulator, field) {
    return _objectSpread({}, accumulator, _defineProperty({}, field.name, field.value || ''));
  }, {});

  var acceptInvite = function acceptInvite(values) {
    return dispatch(action(values, token, uid));
  };

  var newRegister = function newRegister(values, reset) {
    return dispatch(action(values, token, reset));
  };

  var register = function register(values, _ref) {
    var resetForm = _ref.resetForm;
    uid ? acceptInvite(values) : newRegister(values, resetForm);
  };

  var errorMessage = error && _react["default"].createElement("div", {
    className: "alert alert-danger error"
  }, error);

  return _react["default"].createElement("div", {
    className: "Register accounts-form"
  }, registerSuccess && _react["default"].createElement("div", {
    className: "alert alert-success"
  }, successMessage ? successMessage : 'Your account has been created.', redirect && _react["default"].createElement(_reactRouterDom.Link, {
    to: redirect
  }, "Login")), _react["default"].createElement(_formik.Formik, {
    initialValues: initialValues,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: schema,
    onSubmit: function onSubmit(e, b) {
      return register(e, b);
    },
    render: function render(_ref2) {
      var handleSubmit = _ref2.handleSubmit;
      return _react["default"].createElement(_formik.Form, null, fieldComponents, _react["default"].createElement(_SubmitButton["default"], {
        onSubmit: handleSubmit,
        pending: pending,
        text: "Register"
      }), errorMessage);
    }
  }));
};

exports.RegisterComponent = RegisterComponent;

var _default = (0, _reactRedux.connect)(function (state) {
  var authState = (0, _state.getAuthState)(state);
  return {
    error: (0, _state.getAuthError)(authState),
    registerSuccess: (0, _state.getAuthRegisterSuccess)(authState),
    token: (0, _state.getAuthToken)(authState),
    pending: (0, _state.getAuthPending)(authState)
  };
}, function (dispatch) {
  return {
    dispatch: dispatch
  };
})(RegisterComponent);

exports["default"] = _default;