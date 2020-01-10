import { createBrowserHistory, History, Location } from 'history';
import { matchPath } from 'react-router';
import { effect, sink, SinkFactory, state } from 'redux-sink';

import { ActiveRoute, RouteModel } from '@shared/models';

@sink('route')
export class RouteSink {
  public static createHistory = (routes?: Array<RouteModel>) => {
    const history = createBrowserHistory();
    const routeSink = SinkFactory.getSink(RouteSink);

    if (routes) {
      routeSink.addRoutes(routes);
    }

    history.listen(location => {
      routeSink.updateLocation(location);
    });
    routeSink.history = history;
    routeSink.updateLocation(history.location);

    return history;
  }

  @state public history!: History;
  @state public activeRoute!: ActiveRoute;
  @state public routes: Array<RouteModel> = [];

  @effect
  public addRoutes(routes: Array<RouteModel>) {
    this.routes = this.routes.concat(routes);
  }

  @effect
  public updateLocation(location: Location) {
    const activeRoute = this.getActiveRoute(this.routes, location);

    if (activeRoute) {
      this.activeRoute = activeRoute;
    }
  }

  private getActiveRoute(routes: Array<RouteModel>, location: Location): ActiveRoute | null {
    if (!location) {
      return null;
    }

    const activeRoute = this.getMatchedRoute(routes, location);

    if (activeRoute) {
      const searchParams = new URLSearchParams(location.search);
      const queryParams: { [key: string]: string | null } = {};

      searchParams.forEach((value, key) => {
        queryParams[key] = value;
      });
      return { ...activeRoute, queryParams };
    }
    return null;
  }

  private getMatchedRoute(routes: Array<RouteModel>, location: Location): ActiveRoute | undefined {
    for (const route of routes) {
      const matches = matchPath(location.pathname, route.config);

      if (matches) {
        const keys = [route.key];
        let params = matches.params;
        let url = matches.url;
        let model = route;

        if (route.routes) {
          const subRoutes = this.getMatchedRoute(route.routes, location);

          if (subRoutes) {
            keys.push(...subRoutes.keys);
            params = Object.assign(params, subRoutes.params);
            url = subRoutes.url;
            model = subRoutes.model;
          }
        }
        return { keys, url, params, model, queryParams: {} };
      }
    }
  }
}
