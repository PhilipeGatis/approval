import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const Header: React.FC<{}> = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.root} position="fixed">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          News
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
