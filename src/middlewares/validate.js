/*!
 * Redux-form-validation
 * Validate Middleware
 * Do the calidation heavy-lifting
 */
import validateFuncs from './validate-validators';
import defautMessages from './validate-default-messages';

export const VALIDATE = Symbol('Validate');


export default store => next => action => {
  const validator = action[VALIDATE];
  // Check if the middleware is directly called in a action
  if (typeof validator === 'undefined') {
    return next(action);
  }
  // get data from the action call
  const { form, inputName, inputValue, model, component } = validator;

  // init is done at the end



  /**
   * validateRules()
   * Take each validation rule from an input and validates.
   *
   * @param {Object} rules - all the validation rules defined for an input
   * @param {String} inputValue - input value to validate
   * @return {Object} input - input status added to the validation state.
   */
  function validateRules(rules, inputValue) {
    // default store value for an input
    let input = {
      valid: true,
      rules: [],
    };
    // Take each validation rules & validate
    Object.keys(rules).forEach( rule => {
      // if validator exist
      if (validateFuncs[rule]) {
        // return validation status
        const validation = validateFuncs[rule](inputValue, rules[rule]);

        // Do we have an async validation with promise
        if (rule === 'async') {
          input.isPromise = true;
          input.promise = validation;
        }
        // if we have an error
        if (!validation) {
          input.valid = false;
          // add the errored rule to store
          input.rules.push(rule);
          // Define Message used
          const messages = {
            rule: rules[rule],
          };
          input.message = rules.message ||
                          (defautMessages[rule] && defautMessages[rule](messages)) ||
                          (defautMessages[rules[rule]] && defautMessages[rules[rule]](messages));
        }
      }
    });
    return input;
  }

  /**
   * dispatchAction()
   * Dispatch action to store
   *
   * @param {Object} state - input state
   */
  function dispatchAction(state){
    store.dispatch({
      type: 'MODEL_INPUT_VALIDATION',
      model: model.name,
      component,
      inputName,
      state,
    });
  }

  /**
   * validateInput()
   * Validate one input (multiple rules)
   *
   * Default:
   *   @return {Bool} isValid - input validation state
   * if validation incluse an async validation rule, we return a promise
   *   @return {Promise} inputState.promise.promise - Return a promise that will trigger a resolved or reject state depending on input validity.
   */
  function validateInput(name = inputName, value = inputValue) {
    let isValid = true;
    // get validation rules
    const modelData = model.data[name];
    // get input state
    const inputState = validateRules(modelData.validate, value);
    if (!inputState.valid) {
      isValid = false;
    }
    // is the input has an async validation rule;
    if (inputState.isPromise) {
      // in case any other rules state the input is not valid, reject promise
      if (!isValid) { inputState.promise.reject(inputState); }

      // if validation function resolve promise, dispatch a valid action on the input
      inputState.promise.promise.then(() =>{
        dispatchAction({valid: true});
      })
      // if validation fails because of another validation rule or
      // any other rules state the input is not valid, reject promise
      .catch((state) => {
        let currentState = {valid: false};
        // other rules pass back an object
        if (typeof state === 'object') {
          currentState = state;
        // in case the async validation rule pass down an error message when it reject it.
        }else if (typeof state === 'string') {
          currentState.message = state;
        }
        // dispatch input error status to the store
        dispatchAction(currentState);
      });
      // return promise so it can be used in component code. this.validateInput('username').then()
      return inputState.promise.promise;
    }
    // in case we are not in a promise, dispatch input state
    // & return input validity, so it can be used in component code. if(this.validateInput('username')){}
    dispatchAction(inputState);
    return isValid;
  }

  // Form validator, loop throught each input validation
  // ---------
  function validateForm() {
    let formState = {
      valid: true,
    };

    Object.keys(form).forEach( input => {
      if (!validateInput(input, form[input].value)) {
        formState.valid = false;
      }
    });

    store.dispatch({
      type: 'MODEL_FORM_VALIDATION',
      model: model.name,
      component,
      formState,
    });

    return formState.valid;
  }
  /**
   * init the validation middleware
   * Are we validating a form or an input
   */
  if (form) {
    return validateForm();
  }

  if (inputName) {
    return validateInput();
  }
};
