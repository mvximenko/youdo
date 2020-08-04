import React from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    margin: '10px',
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gridGap: '5px',
  },
  item: {
    display: 'block',
    background: 'grey',
    paddingTop: '100%',
  },
  color1: {
    background: '#c6e48b',
  },
  color2: {
    background: '#7bc96f',
  },
  color3: {
    background: '#239a3b',
  },
  color4: {
    background: '#196127',
  },
});

export default function Graph({ items }) {
  const classes = useStyles();
  const { habitId } = useParams();

  return (
    <div className={classes.container}>
      {items[habitId].graph.map((item, index) => (
        <div
          key={index}
          className={`${classes.item} ${classes[`color${item}`]}`}
        ></div>
      ))}
    </div>
  );
}
