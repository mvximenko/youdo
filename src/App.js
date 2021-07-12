import { useMemo } from 'react';
import { Switch, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import useWindowDimensions from './hooks/useWindowDimensions';
import useLocalStorage from './hooks/useLocalStorage';
import Home from './components/Home';
import Graph from './components/Graph';
import NotMobile from './components/NotMobile';
import './App.css';

function App() {
  const [state, setState] = useLocalStorage('state', []);
  const { width } = useWindowDimensions();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          type: 'dark',
        },
      }),
    []
  );

  return (
    <>
      {width > 600 ? (
        <NotMobile />
      ) : (
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
      )}
    </>
  );
}

export default App;
