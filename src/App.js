import React, { useMemo } from 'react';
import { Switch, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import useLocalStorage from './hooks/useLocalStorage';
import Home from './components/Home';
import Graph from './components/Graph';
import './App.css';

function App() {
  const [state, setState] = useLocalStorage('state', []);
  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: 'dark',
        },
      }),
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route exact path='/'>
          <Home items={state} setState={setState} />
        </Route>
        <Route exact path='/habit/:habitId'>
          <Graph items={state} setState={setState} />
        </Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
