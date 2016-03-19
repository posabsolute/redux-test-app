const initialState = {
  permission: 'not-connected',
  username: localStorage.getItem('username') || '',
  password: localStorage.getItem('password') || '',
  url: localStorage.getItem('url') || '',
  displayName: localStorage.getItem('displayName') || '',
  emailAddress: localStorage.getItem('emailAddress') || '',
  avatarUrls: {
    '48x48': localStorage.getItem('avatarUrls') || '',
  },
};

export function user(state = initialState, action) {
  switch (action.type) {
  case 'LOGIN_ATTEMPT':
  console.log(action.data);
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

  case 'FETCH_PROJECT':
    return {
      ...state,
      project: {
        ...action.data,
      },
    };

  default:
    return state;
  }
}
