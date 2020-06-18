import React from 'react';
import { AppTheme } from '../theme';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: AppTheme) => ({
  root: {
    position: 'relative',
    height: '100vh',
  },
  notfound: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '520px',
    width: '100%',
    lineHeight: '1.4',
    textAlign: 'center',
  },
  notfound404: {
    color: '#262626',
    height: '200px',
    '& h3': {
      position: 'relative',
      fontSize: '16px',
      fontWeight: '700',
      textTransform: 'uppercase',
      margin: '0px',
      letterSpacing: '3px',
      paddingLeft: '6px',
    },
    '& h1': {
      fontSize: '200px',
      position: 'absolute',
      left: '50%',
      top: '40%',
      transform: 'translate(-50%, -50%)',
      fontWeight: 900,
      margin: '0px',
      textTransform: 'uppercase',
      letterSpacing: '-40px',
      marginLeft: '-20px',
      '& span': {
        textShadow: '-8px 0px 0px #fff',
      },
    },
    '& h2': {
      fontSize: '20px',
      fontWeight: 400,
      textTransform: 'uppercase',
      color: '#000',
      marginTop: 0,
      marginBottom: '25px',
    },
  },
}));

const NotFound: React.FC<{}> = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.notfound}>
        <div className={classes.notfound404}>
          <h3>Oops! Page not found</h3>
          <h1>
            <span>4</span>
            <span>0</span>
            <span>4</span>
          </h1>
        </div>
        <h2>we are sorry, but the page you requested was not found</h2>
      </div>
    </div>
  );
};

export default NotFound;
