import React, { useMemo } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import ItemList from './components/ItemList';
import Graph from './components/Graph';
import './App.css';

const initialState = [
  {
    id: 0,
    habit: 'Habit #1',
    lastOnline: null,
    graph: {
      result: [4, 4, 1, 1, 2, 1, 2, 1, 4, 1],
    },
  },
];

function App() {
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
      <Header />
      <Switch>
        <Route exact path='/'>
          <ItemList items={initialState} />
        </Route>
        <Route exact path='/habit/:habitId'>
          <Graph items={initialState} />
        </Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
