export default {
  name: 'userModel',
  data: {
    'url': {
      validate: {
        required: true,
        pattern: 'url',
      },
    },
    'username': {
      validate: {
        required: true,
        func: (value) => {
          const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (re.test(value)) {
            return false;
          }
          return true;
        },
        message: 'Jira username only, no email',
      },
    },
    'password': {
      validate: {
        required: true,
      },
    },
  },
  endpoint: () => '/rest/api/2/myself',
  endpointProcessor: (resp) => resp,
};
