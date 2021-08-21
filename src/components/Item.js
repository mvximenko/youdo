import { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';
import useInput from '../hooks/useInput';

const useStyles = makeStyles({
  text: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  button: {
    marginRight: '10px',
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

export default function Item({ id, habit, deleteItem, editItem }) {
  const classes = useStyles();
  const [input, updateInput] = useInput('');
  const [{ isEdit, isDelete }, setState] = useState({
    isEdit: false,
    isDelete: false,
  });

  const handleClick = (e, isOpen = false) => {
    e.preventDefault();
    if (e.currentTarget.name) {
      setState((prevState) => ({
        ...prevState,
        [e.currentTarget.name]: isOpen,
      }));
    } else {
      setState({
        isEdit: false,
        isDelete: false,
      });
    }
  };

  const handleDelete = () => {
    deleteItem(id);
  };

  const handleEdit = (e) => {
    handleClick(e);
    editItem(id, input);
  };

  return (
    <>
      <Link to={`/habit/${id}`}>
        <ListItem>
          <ListItemText primary={habit} className={classes.text} />

          <Button
            name='isEdit'
            variant='outlined'
            value='text'
            className={classes.button}
            onClick={(e) => handleClick(e, true)}
          >
            <EditIcon />
          </Button>

          <Button
            name='isDelete'
            variant='outlined'
            onClick={(e) => handleClick(e, true)}
          >
            <ClearIcon />
          </Button>
        </ListItem>
        <Divider />
      </Link>

      <Dialog open={isEdit} onClose={handleClick}>
        <DialogContent>
          <CssTextField
            autoFocus
            margin='dense'
            id='name'
            label='Edit Habit'
            type='text'
            fullWidth
            onChange={updateInput}
          />
        </DialogContent>
        <DialogActions>
          <Button name='isEdit' onClick={handleClick}>
            Cancel
          </Button>
          <Button name='isEdit' onClick={handleEdit}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isDelete} onClose={handleClick}>
        <DialogTitle>Delete "{habit}"?</DialogTitle>
        <DialogActions>
          <Button name='isDelete' onClick={handleClick}>
            Cancel
          </Button>
          <Button name='isDelete' onClick={handleDelete}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
