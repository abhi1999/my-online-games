import React from 'react';
// import {Game,GameList,BingoLayout} from './containers';
// import {BingoLayout} from './containers';
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Employees = React.lazy(() => import('./views/Employees'));
const JobSites = React.lazy(() => import('./views/JobSites/JobSitesContainer'));
const GameList = React.lazy(() => import('./containers/GameList'));
const Game = React.lazy(() => import('./containers/Game'));
const GameCard = React.lazy(() => import('./containers/GameCard'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Bingo' },
  { path: '/Bingo/Games', exact: true, name: 'Games' ,component: GameList},
  { path: '/Bingo/Games/:gameId', exact: true, name: "Participants", component: Game},
  { path: '/Bingo/Games/:gameId/:participantId', exact: true, name: "Active Game", component: GameCard},
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path:'/admin/employees', name: "Employees", component: Employees},
  { path:'/admin/jobsite', name: "Job Sites", component: JobSites}
];

export default routes;
