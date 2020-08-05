import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Item from './Item';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import AddIcon from '@material-ui/icons/Add';
import Header from './Header';

const useStyles = makeStyles({
  button: {
    position: 'fixed',
    bottom: '0',
    right: '0',
    margin: '0 16px 20px 0',
    background: '#1d1d1d',
    '&:hover': {
      background: '#2d2d2d',
    },
  },
  icon: {
    fill: 'white',
  },
});

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
  },
})(TextField);

export default function Home({ items, setState }) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const addItem = (habit) => {
    const d = new Date();
    const date = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();
    setState([...items, { habit, day: 0, graph: [0], date }]);
    handleClose();
  };

  const deleteItem = (index) => {
    setState([...items.slice(0, index), ...items.slice(index + 1)]);
  };

  return (
    <>
      <Header heading='Welcome' />
      <List component='nav'>
        {items.map((item, index) => (
          <Item
            key={index}
            id={index}
            habit={item.habit}
            handleDelete={deleteItem}
          />
        ))}
      </List>

      <Button
        variant='outlined'
        onClick={handleClickOpen}
        className={classes.button}
      >
        <AddIcon className={classes.icon} />
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <CssTextField
            autoFocus
            margin='dense'
            id='name'
            label='New Habit'
            type='text'
            fullWidth
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => addItem(input)}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
