export default {
  name: 'commentModel',
  data: {
    'comment': {
      validate: {
        required: true,
      },
    },
  },
  endpoint: (id) => `/rest/agile/1.0/issue/${id}/comment`,
};
