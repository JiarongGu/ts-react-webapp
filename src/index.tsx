import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer as AppHotContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import { SinkFactory } from 'redux-sink';

import { BreakpointSink, RouteSink } from '@shared/sinks';

const store = SinkFactory.createStore({
  useTrigger: true,
  devToolOptions: { devToolCompose: composeWithDevTools },
});

const history = RouteSink.createHistory([

]);

BreakpointSink.createListener(window);

ReactDOM.render(
  <AppHotContainer>
    <Provider store={store}>
      <Router history={history}>
        <div>Test </div>
      </Router>
    </Provider>
  </AppHotContainer>,
  document.getElementById('root')
);
