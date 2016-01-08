const sprintModel = {
  data: {},
  },
  endpointCollection: (id) => `/rest/agile/1.0/board/${id}/sprint?state=active,closed`,
  endPoint: (id) => `/rest/agile/1.0/sprint/${id}/issue`,
  endpointProcessor: (resp) => resp.issues,
  endpointCollectionProcessor: (resp) => resp.values,
};

export default sprintModel;
