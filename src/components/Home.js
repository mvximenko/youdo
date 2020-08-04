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

const useStyles = makeStyles({
  button: {
    position: 'fixed',
    bottom: '0',
    right: '0',
    margin: '0 16px 20px 0',
    border: '1px solid #515151',
    background: '#1d1d1d',
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

export default function ItemList({ items }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <List component='nav'>
        {items.map((item) => (
          <Item key={item.id} id={item.id} habit={item.habit} />
        ))}
      </List>

      <Button
        variant='contained'
        onClick={handleClickOpen}
        className={classes.button}
      >
        <AddIcon className={classes.icon} />
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <CssTextField
            className={classes.margin}
            autoFocus
            margin='dense'
            id='name'
            label='New Habit'
            type='text'
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
