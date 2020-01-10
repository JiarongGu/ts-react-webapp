import { RouteModel } from '@shared/models';

import { HomeContainer } from './home-container/home-container';

export const homeRoutes: RouteModel = {
  key: 'home',
  config: {
    path: '/',
    component: HomeContainer
  }
};
