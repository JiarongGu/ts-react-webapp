import { shallow } from 'enzyme';
import * as React from 'react';
import { SinkContainer } from 'redux-sink';

import { RouteSink } from '@shared/sinks';
import { createTestSinkContainer } from '@shared/test';
import { App } from './app';

describe('component:: app-container', () => {
  let sinkContainer!: SinkContainer;

  beforeEach(() => {
    sinkContainer = createTestSinkContainer();
  });

  it('should mount', () => {
    const container = shallow(<App />);
    expect(container.html()).toBeTruthy();
  });

  it('should pass active keys to menu', () => {
    const sink = sinkContainer.getSink(RouteSink);
    const activeKeys = ['test1', 'test2'];
    sink.activeRoute = { keys: activeKeys } as any;

    const container = shallow(<App />);
    expect(container).toBeTruthy();
  });
});
