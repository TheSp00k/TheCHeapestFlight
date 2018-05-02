import * as React from 'react';
import { App as TodoApp } from 'app/containers/App';
import { hot } from 'react-hot-loader';

export const App = hot(module)(() => (
  <TodoApp />
));
