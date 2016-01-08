const userModel = {
  data: {
    'self': {
      type: 'string',
    },
    'name': {
      type: 'string',
    },
    'loginInfo': { // scrum or kanbam
      type: 'object',
    },
  },
  validate: (dispatch, user) => {
    let validate = true;
    if (!user.url) {
      dispatch({
        type: 'GROWLER__SHOW',
        growler: {
          text: 'Please enter your JIRA url',
          type: 'growler--error',
        },
      });
      validate = false;
    }

    return validate;
  },
  endpoint: () => '/rest/api/2/myself',
  endpointProcessor: (resp) => resp,
};

export default userModel;
