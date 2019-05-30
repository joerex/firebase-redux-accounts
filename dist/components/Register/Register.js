"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _formik = require("formik");

var Yup = _interopRequireWildcard(require("yup"));

var _SelectField = _interopRequireDefault(require("../SelectField/SelectField"));

var _SubmitButton = _interopRequireDefault(require("../SubmitButton/SubmitButton"));

require("./Register.css");

var _state = require("../../state");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = function _default(props) {
  var state = props.state,
      _onSubmit = props.onSubmit,
      fields = props.fields;
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

  var errorMessage = state.status === _state.ERROR_STATE && _react["default"].createElement("div", {
    className: "alert alert-danger error"
  }, state.error);

  return _react["default"].createElement("div", {
    className: "Register accounts-form"
  }, state.success && _react["default"].createElement("div", {
    className: "alert alert-success"
  }, _react["default"].createElement("span", null, "Your account has been created.")), _react["default"].createElement(_formik.Formik, {
    initialValues: initialValues,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: schema,
    onSubmit: function onSubmit(e, b) {
      return _onSubmit(e, b);
    },
    render: function render(_ref) {
      var handleSubmit = _ref.handleSubmit;
      return _react["default"].createElement(_formik.Form, null, fieldComponents, _react["default"].createElement(_SubmitButton["default"], {
        onSubmit: handleSubmit,
        pending: state.status === _state.PENDING_STATE,
        text: "Register"
      }), errorMessage);
    }
  }));
};

exports["default"] = _default;