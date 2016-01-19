const userModel = {
  name:'userModel',
  data: {
    'url': {
      validate: {
        required: true,
        func: (value) => {
          return true;
        },
        message: 'This is a test',
      },
    },
    'username': {
      validate: {
        required: true,
        pattern: 'email',
        //async: function() {
        //  setTimeout( () => {
        //      this.resolve("yes");
        //  }, 2000);
        //},
      },
    },
    'password': {
      validate: {
        required: true,
      },
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
