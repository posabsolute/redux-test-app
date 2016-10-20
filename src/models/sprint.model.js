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
  endpointCollection: (id) => `/rest/agile/1.0/board/${id}/sprint?state=closed,active`,
  endpointActiveCollection: (id) => `/rest/agile/1.0/board/${id}/sprint?state=active`,
  endPoint: (id) => `/rest/agile/1.0/sprint/${id}`,
  endPointIssuesActive: (id) => `/rest/agile/1.0/sprint/${id}/issue`,
  endPointIssues: (id) => `/rest/agile/1.0/sprint/${id}/issue`,
  endpointBurndown: (id, projectId) => `/rest/greenhopper/1.0/rapid/charts/scopechangeburndownchart?rapidViewId=${projectId}&sprintId=${id}`,
  endpointReport: (id, projectId) => `/rest/greenhopper/1.0/rapid/charts/sprintreport?rapidViewId=${projectId}&sprintId=${id}`,
  endpointVelocity: (id) => `/rest/greenhopper/1.0/rapid/charts/velocity?rapidViewId=${id}`,
  endPointIssuesProcessor: (resp) => resp.issues,
  endpointCollectionProcessor: (resp) => resp.values,
};

export default sprintModel;
