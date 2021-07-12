import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Header from './Header';

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

export default function Graph({ items, setState }) {
  const classes = useStyles();
  const { habitId } = useParams();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const pickColor = (number) => {
    const state = JSON.parse(localStorage.getItem('state'));
    state[habitId].graph[state[habitId].graph.length - 1] = number;
    setState(state);
    handleClose();
  };

  useEffect(() => {
    const d1 = new Date(items[habitId].date);
    const d2 = new Date();
    const days = Math.floor((d2.getTime() - d1.getTime()) / (1000 * 3600 * 24));

    if (items[habitId].day !== days) {
      const data = JSON.parse(localStorage.getItem('state'));
      const state = data[habitId];
      for (let i = 0; i < days - state.day; i++) {
        state.graph.push(0);
      }
      state.day = days;
      setState(data);
    }
  }, [items, habitId, setState]);

  return (
    <>
      <Header heading={items[habitId].habit} />
      <div className={classes.container}>
        {items[habitId].graph.map((item, index) => (
          <div
            key={index}
            className={`${classes.item} ${classes[`color${item}`]}`}
            {...(index === items[habitId].graph.length - 1 && {
              onClick: handleClickOpen,
            })}
          ></div>
        ))}
      </div>
      <Dialog open={open}>
        <DialogTitle>Pick a square</DialogTitle>
        <DialogContent>
          <div
            className={`${classes.item} ${classes.color1}`}
            onClick={() => pickColor(1)}
          ></div>
          <div
            className={`${classes.item} ${classes.color2}`}
            onClick={() => pickColor(2)}
          ></div>
          <div
            className={`${classes.item} ${classes.color3}`}
            onClick={() => pickColor(3)}
          ></div>
          <div
            className={`${classes.item} ${classes.color4}`}
            onClick={() => pickColor(4)}
          ></div>
        </DialogContent>
      </Dialog>
    </>
  );
}
