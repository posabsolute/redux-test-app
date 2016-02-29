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
  endpointCollection: (id) => `/rest/agile/1.0/board/${id}/sprint?state=closed`,
  endPoint: (id) => `/rest/agile/1.0/sprint/${id}`,
  endPointIssues: (id) => `/rest/agile/1.0/sprint/${id}/issue?jql=issuetype%20in%20(Bug%2C%20Improvement%2C%20Story%2C%20Task)%20AND%20status%20%3D%20Closed%20ORDER%20BY%20issuetype%20DESC`,
  endpointBurndown: (id) => `/rest/greenhopper/1.0/rapid/charts/scopechangeburndownchart?rapidViewId=1&sprintId=${id}`,
  endpointReport: (id) => `/rest/greenhopper/1.0/rapid/charts/sprintreport?rapidViewId=1&sprintId=${id}`,
  endpointVelocity: (id) => `/rest/greenhopper/1.0/rapid/charts/velocity?rapidViewId=1`,
  endPointIssuesProcessor: (resp) => resp.issues,
  endpointCollectionProcessor: (resp) => resp.values,
};

export default sprintModel;
