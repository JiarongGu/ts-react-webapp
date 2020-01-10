import * as React from 'react';
import { useSink } from 'redux-sink';

import { RouteContent } from '@components';
import { RouteSink } from '@shared/sinks';

import * as styles from './app.scss';

export const App: React.FunctionComponent = () => {
  const navigation = useSink(RouteSink, (sink) => [sink.activeRoute]);

  return (
    <div className={styles.layout}>
      <div className={styles.layoutRouteContent}>
        <RouteContent routes={navigation.routes} />
      </div>
    </div>
  );
};
