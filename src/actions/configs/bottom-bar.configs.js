export const sprintButtons = [{
  id: 1,
  icon: 'ion-ios-list',
  link: (id) => `/sprint/${id}/index`,
  label: 'Issues List',
  status: 'active',
}, {
  id: 2,
  icon: 'ion-ios-flame',
  link: (id) => `/sprint/${id}/burndown`,
  label: 'Burndown Chart',
  status: '',
}, {
  id: 3,
  icon: 'ion-bug',
  link: (id) => `/sprint/${id}/developers`,
  label: 'Developers',
  status: '',
}];


export const sprintsListButtons = [{
  id: 1,
  icon: 'ion-ios-list',
  link: (id) => `/projects/${id}/sprints/index`,
  label: 'Sprints List',
  status: 'active',
}, {
  id: 2,
  icon: 'ion-ios-speedometer',
  link: (id) => `/projects/${id}/sprints/velocity`,
  label: 'Velocity Chart',
  status: '',
}];
