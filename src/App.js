import React, { useMemo } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import ItemList from './components/ItemList';
import './App.css';

const initialState = [{ id: 1, habit: 'Habit #1' }];

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
          <h1>Habit</h1>
        </Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
