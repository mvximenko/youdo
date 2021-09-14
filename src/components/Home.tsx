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
import { State } from '../hooks/useLocalStorage';

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

interface Props {
  items: State[];
  setState: React.Dispatch<State[]>;
}

export default function Home({ items, setState }: Props) {
  const classes = useStyles();
  const [input, updateInput, resetInput] = useInput('');
  const [open, toggleOpen] = useToggle(false);

  const addItem = (habit: string) => {
    const d = new Date();
    const id = d.getTime();
    const date = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();
    const day = (d.getDay() + 6) % 7;

    let graph = [];
    for (let i = 0; i < day; i++) {
      graph.push(5);
    }
    graph.push(0);

    toggleOpen();
    setState([...items, { id, habit, day: 0, graph, date }]);
    resetInput();
  };

  const deleteItem = (index: number) => {
    setState([...items.slice(0, index), ...items.slice(index + 1)]);
  };

  const editItem = (index: number, habit: string) => {
    const newItems = [...items];
    newItems[index].habit = habit;
    setState(newItems);
  };

  return (
    <>
      <Header heading='Welcome' />
      <List component='nav'>
        {items.map((item: State, index) => (
          <Item
            key={item.id}
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
            label='New habit'
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
