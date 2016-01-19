/*!
 * Redux-form-validation
 * Validators
 * Most of them are taken shamelessly from backbone.validation (https://github.com/thedersen/backbone.validation)
 */
import {isNumber, Deferred} from './validate-utils';
import defaultPatterns from './validate-default-patterns';

export default {
  required(value) {
    return value ? true : false;
  },
  // function validator
  // Call a function that must return true
  func(value, rule) {
    if (typeof rule !== 'function') {
      console.warn('func validation rule is not a function', rule);
      return false;
    }
    return rule(value);
  },
  // Async validator
  // Send a promess to the model async validation option,
  // the promess must be resolved or rejected by the async function
  async(value, rule) {
    const asyncPromise = new Deferred();
    if (typeof rule.then === 'function') {
      console.warn('async is not a promise', rule);
      asyncPromise.reject();
    }
    rule.call(asyncPromise, value);
    return asyncPromise;
  },
  // Acceptance validator
  // Validates that something has to be accepted, e.g. terms of use
  // true or 'true' are valid
  acceptance(value) {
    if (value != true) {
      return false;
    }
    return true;
  },

  // Min validator
  // Validates that the value has to be a number and equal to or greater than
  // the min value specified
  min(value, rule) {
    if (!isNumber(value) || value < rule) {
      return false;
    }
    return true;
  },

  // Max validator
  // Validates that the value has to be a number and equal to or less than
  // the max value specified
  max(value, rule) {
    if (!isNumber(value) || value > rule) {
      return false;
    }
    return true;
  },

  // Range validator
  // Validates that the value has to be a number and equal to or between
  // the two numbers specified
  range(value, rule) {
    if (!isNumber(value) || value < rule[0] || value > rule[1]) {
      return false;
    }
    return true;
  },

  // Length validator
  // Validates that the value has to be a string with length equal to
  // the length value specified
  length(value, rule) {
    console.log(rule);
    if (typeof value !== 'string' || value.length !== rule) {
      return false;
    }
    return true;
  },

  // Min length validator
  // Validates that the value has to be a string with length equal to or greater than
  // the min length value specified
  minLength(value, rule) {
    if (typeof value !== 'string' || value.length < rule) {
      return false;
    }
    return true;
  },

  // Max length validator
  // Validates that the value has to be a string with length equal to or less than
  // the max length value specified
  maxLength(value, rule) {
    if (typeof value !== 'string' || value.length > rule) {
      return false;
    }
    return true;
  },

  // Range length validator
  // Validates that the value has to be a string and equal to or between
  // the two numbers specified
  rangeLength(value, rule) {
    if (typeof value !== 'string' || value.length < rule[0] || value.length > rule[1]) {
      return false;
    }
    return true;
  },

  // One of validator
  // Validates that the value has to be equal to one of the elements in
  // the specified array. Case sensitive matching
  oneOf(value, rule) {
    const elem = rule.find( (arrayVal) => arrayVal == value);
    if (!elem) {
      return false;
    }
    return true;
  },

  // Equal to validator
  // Validates that the value has to be equal to the value of the attribute
  // with the name specified
  equalTo(value, rule) {
    if (value != rule) {
      return false;
    }
    return true;
  },

  // Pattern validator
  // Validates that the value has to match the pattern specified.
  // Can be a regular expression or the name of one of the built in patterns
  pattern(value, rule) {
    if (!value || !value.toString().match(defaultPatterns[rule] || rule)) {
      return false;
    }
    return true;
  },
};
