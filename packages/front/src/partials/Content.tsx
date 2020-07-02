import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppTheme } from '../theme';
import ImageStage from '../components/ImageStage';
import useLocal from '../relayComponents/useLocal';

interface StyleProps {
  showInfoArea: boolean;
}

const useStyles = makeStyles((theme: AppTheme) => ({
  root: {
    flexGrow: 1,
    overflowY: 'auto',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
  },
  contentArea: {
    display: 'flex',
    justifyContent: 'flex-end',
    height: '100%',
  },
  stage: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
}));

const Content = () => {
  const [selected] = useLocal('info_selected', 'value');
  const classes = useStyles({ showInfoArea: !!selected });
  return (
    <div className={classes.root}>
      <div className={classes.toolbar} />
      <div className={classes.contentArea}>
        <div className={classes.stage}>
          <ImageStage />
        </div>
      </div>
    </div>
  );
};

export default Content;
