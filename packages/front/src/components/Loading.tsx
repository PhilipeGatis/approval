import React from 'react';
import { AppTheme } from '../theme';
import { makeStyles } from '@material-ui/core/styles';
import Lottie from 'react-lottie';
import loadingAnimation from '../assets/loading.json';
import Backdrop from '@material-ui/core/Backdrop';

const useStyles = makeStyles((theme: AppTheme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const NotFound: React.FC<{}> = () => {
  const classes = useStyles();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <Backdrop className={classes.backdrop} open={true}>
      <Lottie options={defaultOptions} width={400} height={400} />
    </Backdrop>
  );
};

export default NotFound;
