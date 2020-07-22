import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import NotFound from './pages/NotFound';
import theme from './theme';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import modernEnvironment from './relay/environment';

import Tool from './pages/Tool';

const App: React.FC<{}> = () => {
  return (
    <RelayEnvironmentProvider environment={modernEnvironment}>
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Switch>
            <Route path="/404" component={NotFound} />
            <Route path="/:id" component={Tool} />
            <Redirect to="/404" />
          </Switch>
        </ThemeProvider>
      </Router>
    </RelayEnvironmentProvider>
  );
};

export default App;
