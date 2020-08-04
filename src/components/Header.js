import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  appBar: {
    background: '#282828',
  },
  title: {
    width: '100%',
    textAlign: 'center',
    userSelect: 'none',
  },
});

export default function Header({ heading }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.appBar}>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            {heading}{' '}
            <span role='img' aria-label='fox'>
              🦊
            </span>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
