// src/routes/config.js

import JumbledWords from '../pages/services/JumbledWords';
import OpenAi from '../pages/services/OpenAi';
import OpalTeam from '../pages/services/OpalTeam';

const routes = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'About',
    children: [
      { label: 'Team', path: '/about/team' },
      { label: 'Company', path: '/about/company' },
    ],
  },
  {
    label: 'Services',
    children: [
      { label: 'Jumbled Words', path: '/services/jumbled-words', component: JumbledWords },
      { label: 'Open AI', path: '/services/openai', component: OpenAi },
      { label: 'Opal Team', path: '/services/opal-team', component: OpalTeam },
    ],
  },
  {
    label: 'Contact',
    path: '/contact',
  },
];

export default routes;
