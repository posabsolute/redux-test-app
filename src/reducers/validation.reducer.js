const initialState = {};

export function validation(state = initialState, action) {
  switch (action.type) {
  case 'MODEL_INPUT_VALIDATION':
    console.log(action)
    console.log(state[action.component][action.model]);
    var nextState = Object.assign({}, state);
    nextState[action.component][action.model][action.inputName] = action.state;
    return {
      ...nextState,
    };

  case 'MODEL_COMPONENT_DEFAULT_STATE':
    return {
      ...state,
      [action.component]: {
        [action.model]: {},
      },
    };

  case 'LOGGED_SUCCESSFULLY':
    return {
      ...state,
      ...action.data,
      permission: 'Authorized',
    };

  default:
    return state;
  }
}

/*
validation = {
  login : {
    user: {
      url:{
        validate: true,
        message: "This field is required"
      }
    }
  }
}
*/