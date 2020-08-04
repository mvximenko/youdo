import React, { useState, useMemo } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Graph from './components/Graph';
import './App.css';

const initialState = [
  {
    id: 0,
    habit: 'Habit #1',
    day: null,
    graph: [4, 4, 1, 1, 2, 1, 2, 1, 4, 1],
  },
];

function App() {
  const [state, setState] = useState(initialState);
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
          <Graph items={state} />
        </Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
