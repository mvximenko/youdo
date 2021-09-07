import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    width: '100%',
    display: 'flex',
    position: 'absolute',
    top: '40%',
    justifyContent: 'center',
  },
});

const NotMobile = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h1>Only mobile experience</h1>
    </div>
  );
};

export default NotMobile;
