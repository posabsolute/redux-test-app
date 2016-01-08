const sprintModel = {
  data: {
    'name': {
      type: 'string',
      validate: {required: true },
    },
    'id': {
      type: 'float',
    },
    'state': { // scrum or kanbam
      type: 'string',
    },
    'startDate': { // url
      type: 'date',
    },
    'endDate': { // url
      type: 'date',
    },
  },
  endpointCollection: (id) => `/rest/agile/1.0/board/${id}/sprint?state=active,closed`,
  endPoint: (id) => `/rest/agile/1.0/sprint/${id}`,
  endPointIssues: (id) => `/rest/agile/1.0/sprint/${id}/issue`,
  endPointIssuesProcessor: (resp) => resp.issues,
  endpointCollectionProcessor: (resp) => resp.values,
};

export default sprintModel;
