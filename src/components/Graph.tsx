import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Header from './Header';
import { State } from '../hooks/useLocalStorage';

interface Props {
  items: State[];
  setState: React.Dispatch<State[]>;
}

interface ColorClasses {
  [key: string]: {
    background: (props: { colors: string[] }) => string;
  };
}

const defaultColors = ['grey', '#c6e48b', '#7bc96f', '#239a3b', '#196127'];
const moodColors = ['grey', '#dc2626', '#fcd34d', '#4ade80', '#22d3ee'];

const makeColorClasses = () => {
  const classes: ColorClasses = {};

  for (let i = 0; i < defaultColors.length; i++) {
    classes[`color${i}`] = {
      background: ({ colors }) => colors[i],
    };
  }

  return classes;
};

const useStyles = makeStyles<Theme>({
  container: {
    margin: '10px',
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gridGap: '5px',
  },
  days: {
    textAlign: 'center',
  },
  item: {
    display: 'block',
    paddingTop: '100%',
  },
  marginBottom: {
    marginBottom: '15px',
  },
  ...makeColorClasses(),
});

export default function Graph({ items, setState }: Props) {
  const { id } = useParams<{ id: string }>();
  const habitId = +id;

  const classes = useStyles({
    colors: items[habitId].habit.toUpperCase().includes('MOOD')
      ? moodColors
      : defaultColors,
  });

  const [open, setOpen] = useState(false);
  const [square, setSquare] = useState(0);

  const handleClickOpen = (index: number) => {
    setSquare(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const pickColor = (number: number) => {
    const state = JSON.parse(localStorage.getItem('state')!);
    state[habitId].graph[square] = number;
    setState(state);
    handleClose();
  };

  useEffect(() => {
    const d1 = new Date(items[habitId].date);
    const d2 = new Date();
    const days = Math.floor((d2.getTime() - d1.getTime()) / (1000 * 3600 * 24));

    if (items[habitId].day !== days) {
      const data = JSON.parse(localStorage.getItem('state')!);
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
      <div className={`${classes.container} ${classes.days}`}>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
        <div>Sun</div>
      </div>

      <div className={classes.container}>
        {items[habitId].graph.map((item: number, index) => (
          <div
            key={index}
            className={`${classes.item} ${classes[`color${item}`] || ''}`}
            {...((index === items[habitId].graph.length - 1 ||
              index === items[habitId].graph.length - 2) && {
              onClick: () => handleClickOpen(index),
            })}
          />
        ))}
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Pick a square</DialogTitle>
        <DialogContent>
          <div
            className={`${classes.item} ${classes.color1}`}
            onClick={() => pickColor(1)}
          />
          <div
            className={`${classes.item} ${classes.color2}`}
            onClick={() => pickColor(2)}
          />
          <div
            className={`${classes.item} ${classes.color3}`}
            onClick={() => pickColor(3)}
          />
          <div
            className={`${classes.item} ${classes.color4} ${classes.marginBottom}`}
            onClick={() => pickColor(4)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
