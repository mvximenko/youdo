import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles({
  text: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
});

export default function ListDividers({ id, habit }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClick = (e, value) => {
    e.preventDefault();
    setOpen(value);
  };

  return (
    <Link to={`/habit/${id}`}>
      <ListItem>
        <ListItemText primary={habit} className={classes.text} />
        <Button variant='outlined' onClick={(e) => handleClick(e, true)}>
          <ClearIcon />
        </Button>
        <Dialog open={open} onClick={(e) => handleClick(e, false)}>
          <DialogTitle id={id}>Delete {habit}?</DialogTitle>
          <DialogActions>
            <Button onClick={(e) => handleClick(e, false)}>Cancel</Button>
            <Button onClick={(e) => handleClick(e, false)}>Confirm</Button>
          </DialogActions>
        </Dialog>
      </ListItem>
      <Divider />
    </Link>
  );
}
