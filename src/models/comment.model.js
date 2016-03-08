export default {
  name: 'commentModel',
  data: {
    'comment': {
      validate: {
        required: true,
      },
    },
  },
  endpoint: (id) => `/rest/api/2/issue/${id}/comment`,
};
