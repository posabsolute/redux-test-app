export default{
  data: {
    's': {
      validate: {required: true },
    },
  },
  endpoint: (query) => {
    const isId = /[a-zA-Z]+-[0-9]+/.test(query);
    const searchType = isId ? 'id =' : 'text ~';
    return `/rest/api/2/search?jql=${searchType} "${query}"`;
  },
  endPointProcessor: (resp) => resp.issues,
};
