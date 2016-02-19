export default {
  data: {},
  endpoint: (id) => `/rest/agile/1.0/issue/${id}`,
  endpointProcessor: (resp) => {
    return {
      key: resp.key,
      self: resp.self,
      ...resp.fields,
    };
  },
};