import { VALIDATE } from 'middlewares/validate';

export function setDefaultValidatorState(component, model) {
  return {
    type: 'MODEL_COMPONENT_DEFAULT_STATE',
    component,
    model,
  };
}

export function validateInput(inputValue, inputName, component, model) {
  return {
    [VALIDATE]: {
      inputName,
      inputValue,
      component,
      model,
    },
  };
}

export function validateForm(form, component, model) {
  return {
    [VALIDATE]: {
      form,
      component,
      model,
    },
  };
}
