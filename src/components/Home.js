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
import useInput from '../hooks/useInput';
import useToggle from '../hooks/useToggle';

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
  const [input, updateInput] = useInput('');
  const [open, toggleOpen] = useToggle(false);

  const addItem = (habit) => {
    const d = new Date();
    const date = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();
    const day = (d.getDay() + 6) % 7;

    let graph = [];
    for (let i = 0; i < day; i++) {
      graph.push(5);
    }
    graph.push(0);

    setState([...items, { habit, day: 0, graph, date }]);
    toggleOpen();
  };

  const deleteItem = (index) => {
    setState([...items.slice(0, index), ...items.slice(index + 1)]);
  };

  const editItem = (index, habit) => {
    const newItems = [...items];
    newItems[index].habit = habit;
    setState(newItems);
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
            deleteItem={deleteItem}
            editItem={editItem}
          />
        ))}
      </List>

      <Button
        variant='outlined'
        onClick={toggleOpen}
        className={classes.button}
      >
        <AddIcon className={classes.icon} />
      </Button>

      <Dialog open={open} onClose={toggleOpen}>
        <DialogContent>
          <CssTextField
            autoFocus
            margin='dense'
            id='name'
            label='New Habit'
            type='text'
            fullWidth
            onChange={updateInput}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleOpen}>Cancel</Button>
          <Button onClick={() => addItem(input)}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
