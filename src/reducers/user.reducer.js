const initialState = {
  permission: 'not-connected',
  username: localStorage.getItem('username') || '',
  password: localStorage.getItem('password') || '',
  url: localStorage.getItem('url') || '',
  name: 'cedric',
  avatarUrls: {},
};

export function user(state = initialState, action) {
  switch (action.type) {
  case 'LOGIN_ATTEMPT':
    return {
      ...state,
      ...action.data,
    };

  case 'LOGGED_FAILED':
    return {
      ...state,
      ...action.data,
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
