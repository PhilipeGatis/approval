import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppTheme } from '../theme';
import clsx from 'clsx';
import Image from '../components/Image';

const useStyles = makeStyles((theme: AppTheme) => ({
  root: {
    position: 'fixed',
    overflowY: 'auto',
    height: '100%',
    width: '100%',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  background: {
    backgroundImage:
      'linear-gradient(45deg,#e3e9ed 25%,transparent 0),linear-gradient(-45deg,#e3e9ed 25%,transparent 0),linear-gradient(45deg,transparent 75%,#e3e9ed 0),linear-gradient(-45deg,transparent 75%,#e3e9ed 0)',
    backgroundSize: '20px 20px',
    backgroundPosition: '0 0,0 10px,10px -10px,-10px 0',
  },
  stage: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
}));

interface Props {
  approvalId: string;
}

const Content: React.FC<Props> = ({ approvalId }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.toolbar} />
      <div className={clsx(classes.stage, classes.background)}>
        <Image />
      </div>
    </div>
  );
};

export default Content;
