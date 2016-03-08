export default {
  name: 'userModel',
  data: {
    'url': {
      validate: {
        required: true,
        pattern:'url',
      },
    },
    'username': {
      validate: {
        required: true,
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
