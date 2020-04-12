import React from 'react';
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Employees = React.lazy(() => import('./views/Employees'));
const JobSites = React.lazy(() => import('./views/JobSites/JobSitesContainer'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path:'/admin/employees', name: "Employees", component: Employees},
  { path:'/admin/jobsite', name: "Job Sites", component: JobSites}
];

export default routes;
