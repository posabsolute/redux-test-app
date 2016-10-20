export default {
  data: {},
  endpoint: (id) => `/rest/api/2/issue/${id}?expand=transitions`,
  endpointUpdate: (id) => `/rest/api/2/issue/${id}`,
  endpointTransitions: (id) => `/rest/api/2/issue/${id}/transitions`,
  endpointUserAssignable: (id) => `/rest/api/2/user/assignable/search?issueKey=${id}`,
  endpointAssign: (id) => `/rest/api/2/issue/${id}/assignee`,
  endpointProcessor: (resp) => {
    return {
      key: resp.key,
      self: resp.self,
      transitions: resp.transitions,
      ...resp.fields,
    };
  },
};
