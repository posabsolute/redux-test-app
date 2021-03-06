export default {
  data: {
    'name': {
      type: 'string',
      validate: {required: true },
    },
    'id': {
      type: 'float',
    },
    'type': { // scrum or kanbam
      type: 'string',
    },
    'self': { // url
      type: 'string',
    },
  },
  endpointCollection: () => '/rest/agile/1.0/board',
  endpointConfig: (id) => `/rest/agile/1.0/board/${id}/configuration`,
  endpointCollectionProcessor: (resp) => resp ? resp.values.filter(project => project.type === 'scrum') : [],
  endpointPriorities: (id) => `/rest/api/2/priority`,
};
