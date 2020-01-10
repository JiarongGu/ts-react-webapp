import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer as AppHotContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import { SinkFactory } from 'redux-sink';

import { App } from '@containers/app';
import { homeRoutes } from '@containers/home';

import { BreakpointSink, RouteSink } from '@shared/sinks';

import '@shared/styles/reset.css';

const store = SinkFactory.createStore({
  useTrigger: true,
  devToolOptions: { devToolCompose: composeWithDevTools },
});

const history = RouteSink.createHistory([homeRoutes]);

BreakpointSink.createListener(window);

ReactDOM.render(
  <AppHotContainer>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </AppHotContainer>,
  document.getElementById('root')
);
