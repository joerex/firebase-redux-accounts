"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _Register = require("./Register");

var Yup = _interopRequireWildcard(require("yup"));

var _formik = require("formik");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var props = {
  fields: [{
    name: 'email',
    type: 'text',
    placeholder: 'Email',
    schema: Yup.string().required('Required'),
    initialValue: 'bob@gmail.com'
  }]
};

var renderTests = function renderTests() {
  var component = (0, _enzyme.mount)(_react["default"].createElement(_Register.RegisterComponent, props));
  it('should render an email input', function () {
    expect(component.find('input[name="email"]').exists()).toEqual(true);
  });
  it('should render a submit button', function () {
    expect(component.find('button.submit').length).toEqual(1);
  });
};

var stateTests = function stateTests() {
  var successSelector = 'div.alert.alert-success';
  var component = (0, _enzyme.shallow)(_react["default"].createElement(_Register.RegisterComponent, props));
  it('should display success message', function () {
    expect(component.find(successSelector).exists()).toEqual(false);
    component.setProps({
      registerSuccess: true
    });
    expect(component.find(successSelector).exists()).toEqual(true);
  });
};

var errorTests = function errorTests() {
  var error = 'Houston, we have a problem';
  var selector = 'div.alert.alert-danger.error';
  var component = (0, _enzyme.mount)(_react["default"].createElement(_Register.RegisterComponent, props));
  it('should display an error message from props', function () {
    expect(component.find(selector).exists()).toEqual(false);
    component.setProps({
      error: error
    });
    expect(component.find(selector).text()).toEqual(error);
  });
};

var actionTests = function actionTests() {
  var action = jest.fn();
  var dispatch = jest.fn();

  var actionProps = _objectSpread({}, props, {
    action: action,
    dispatch: dispatch
  });

  var component = (0, _enzyme.mount)(_react["default"].createElement(_Register.RegisterComponent, actionProps));
  it('should handle submit',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return component.find(_formik.Formik).props().onSubmit({
              email: ''
            }, {
              resetForm: action
            });

          case 2:
            expect(action).toBeCalledTimes(1);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
};

describe('Register Component', function () {
  describe('Render', renderTests);
  describe('State', stateTests);
  describe('Errors', errorTests);
  describe('Actions', actionTests);
});