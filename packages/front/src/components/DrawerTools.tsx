import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { AppTheme } from '../theme';
import clsx from 'clsx';

const useStyles = makeStyles((theme: AppTheme) => ({
  paper: {
    background: 'transparent',
    justifyContent: 'center',
    border: 'unset',
  },
  list: {
    background: theme.palette.background.paper,
    width: theme.app.drawerToolsWidth,
    boxShadow: theme.shadows[2],
  },
  listRigth: {
    borderRadius: '10px 0px 0px 10px',
  },
  listLeft: {
    borderRadius: '0px 10px 10px 0px',
  },
}));

interface Props {
  anchor: 'left' | 'right';
}

const RightMenu: React.FC<Props> = ({ children, anchor }) => {
  const classes = useStyles();

  return (
    <Drawer
      classes={{ paper: classes.paper }}
      anchor={anchor}
      variant="permanent"
      open
    >
      <div
        className={clsx(classes.list, {
          [classes.listRigth]: anchor === 'right',
          [classes.listLeft]: anchor === 'left',
        })}
        role="presentation"
      >
        {children}
      </div>
    </Drawer>
  );
};

export default RightMenu;
