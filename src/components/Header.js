import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const animals = [
  { name: 'fox', emoji: '🦊' },
  { name: 'dog', emoji: '🐶' },
  { name: 'hamster', emoji: '🐹' },
  { name: 'koala', emoji: '🐨' },
  { name: 'bear', emoji: '🐻' },
  { name: 'rabbit', emoji: '🐰' },
  { name: 'squid', emoji: '🦑' },
];

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
  const [animal] = useState(animals[Math.floor(Math.random() * 7)]);

  return (
    <AppBar position='static' className={classes.appBar}>
      <Toolbar>
        <Typography variant='h6' className={classes.title}>
          {heading}{' '}
          <span role='img' aria-label={animal.name}>
            {animal.emoji}
          </span>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
