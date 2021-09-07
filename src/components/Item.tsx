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

interface Props {
  id: number;
  habit: string;
  deleteItem: (id: number) => void;
  editItem: (id: number, input: string) => void;
}

const initialState = {
  isEdit: false,
  isDelete: false,
};

export default function Item({ id, habit, deleteItem, editItem }: Props) {
  const classes = useStyles();
  const [input, updateInput, resetInput] = useInput('');
  const [{ isEdit, isDelete }, setState] = useState(initialState);

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    isOpen = false
  ) => {
    e.preventDefault();
    if (e.currentTarget.name) {
      setState((prevState) => ({
        ...prevState,
        [e.currentTarget.name]: isOpen,
      }));
    } else {
      setState(initialState);
    }
  };

  const handleClose = () => {
    setState(initialState);
  };

  const handleDelete = () => {
    setState(initialState);
    deleteItem(id);
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleClick(e);
    editItem(id, input);
    resetInput();
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

      <Dialog open={isEdit} onClose={handleClose}>
        <DialogContent>
          <CssTextField
            autoFocus
            margin='dense'
            id='name'
            label='Edit habit'
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

      <Dialog open={isDelete} onClose={handleClose}>
        <DialogTitle>Delete habit?</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this habit?
        </DialogContent>
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
