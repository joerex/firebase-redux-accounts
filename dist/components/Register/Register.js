"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread4 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireWildcard(require("react"));

var _formik = require("formik");

var Yup = _interopRequireWildcard(require("yup"));

var _SelectField = _interopRequireDefault(require("../SelectField/SelectField"));

var _SubmitButton = _interopRequireDefault(require("../SubmitButton/SubmitButton"));

require("./Register.css");

var _views = require("../../state/views");

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
      return (0, _objectSpread4["default"])({}, accumulator, (0, _defineProperty2["default"])({}, field.name, field.schema));
    } else {
      return accumulator;
    }
  }, {});
  var schema = Yup.object().shape(shape);
  var initialValues = fields.reduce(function (accumulator, field) {
    return (0, _objectSpread4["default"])({}, accumulator, (0, _defineProperty2["default"])({}, field.name, field.value || ''));
  }, {});

  var errorMessage = state.status === _views.ERROR_STATE && _react["default"].createElement("div", {
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
        pending: state.status === _views.PENDING_STATE,
        text: "Register"
      }), errorMessage);
    }
  }));
};

exports["default"] = _default;