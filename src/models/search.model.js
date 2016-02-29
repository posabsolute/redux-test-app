export default{
  data: {
    's': {
      validate: {required: true },
    },
  },
  endpoint: (query) => `/rest/api/2/search?jql=text ~ "${query}"`,
  endPointProcessor: (resp) => resp.issues,
};
