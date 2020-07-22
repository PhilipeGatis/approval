import React, { useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import NoteIcon from '@material-ui/icons/Note';
import { makeStyles } from '@material-ui/core/styles';
import { AppTheme } from '../theme';
import Divider from '@material-ui/core/Divider';
import useLocal from '../relayComponents/useLocal';
import { InfoAreaType } from '../Types';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import useApproveMutation from '../relayComponents/useApproveMutation';
import PeopleIcon from '@material-ui/icons/People';
import { parse, stringify } from 'qs';
import clsx from 'clsx';
import InfoArea from './InfoArea';
import Drawer from '@material-ui/core/Drawer';

const useStyles = makeStyles((theme: AppTheme) => ({
  root: {
    width: theme.app.infoAreaWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  paper: {
    background: 'transparent',
    justifyContent: 'center',
    border: 'unset',
  },
  content: {
    display: 'flex',
    height: '100%',
  },
  menu: {
    minWidth: theme.app.drawerToolsWidth,
    display: 'flex',
    alignItems: 'center',
  },
  menuArea: {
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    borderRadius: '10px 0px 0px 10px',
  },
  open: {
    width: theme.app.infoAreaWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  close: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  approve: {
    color: 'green',
  },
  repprove: {
    color: 'red',
  },
  listIcon: {
    minWidth: 'unset',
  },
}));

interface Props {
  isCanApprove: boolean | undefined;
}

const RightMenu: React.FC<Props> = ({ isCanApprove }) => {
  const location = useLocation();
  const history = useHistory();

  const classes = useStyles();

  const queryString = parse(location.search, { ignoreQueryPrefix: true });

  const { id: approvalId } = useParams();
  const { mutate, isPending } = useApproveMutation();
  const [infoSelected, toggleInfo] = useLocal('info_selected');

  const infoOpenend = !!infoSelected;

  useEffect(() => {
    toggleInfo(queryString.area);
  }, [queryString, toggleInfo]);

  const handleApprove = (approved: boolean) => {
    mutate({
      variables: {
        approvalId: approvalId,
        approved: approved,
      },
    });
  };

  const handleDrawer = (infoContext: string) => {
    history.push({
      pathname: location.pathname,
      search: stringify({ ...queryString, area: infoContext }),
    });
  };

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.root, {
        [classes.open]: infoOpenend,
        [classes.close]: !infoOpenend,
      })}
      classes={{
        paper: clsx(classes.paper, {
          [classes.open]: infoOpenend,
          [classes.close]: !infoOpenend,
        }),
      }}
      anchor="right"
      open
    >
      <div className={classes.content}>
        <div className={classes.menu}>
          <div className={classes.menuArea}>
            <List>
              {isCanApprove && (
                <>
                  <ListItem disabled={isPending} onClick={() => handleApprove(true)} button>
                    <ListItemIcon className={clsx(classes.approve, classes.listIcon)}>
                      <CheckIcon />
                    </ListItemIcon>
                  </ListItem>
                  <ListItem disabled={isPending} onClick={() => handleApprove(false)} button>
                    <ListItemIcon className={clsx(classes.repprove, classes.listIcon)}>
                      <CloseIcon />
                    </ListItemIcon>
                  </ListItem>
                  <Divider />
                </>
              )}
              <ListItem
                selected={infoSelected === InfoAreaType.NOTES}
                disabled={isPending}
                onClick={() => handleDrawer(infoSelected === InfoAreaType.NOTES ? '' : InfoAreaType.NOTES)}
                button
              >
                <ListItemIcon className={classes.listIcon}>
                  <NoteIcon />
                </ListItemIcon>
              </ListItem>
              <ListItem
                selected={infoSelected === InfoAreaType.APPROVERS}
                disabled={isPending}
                onClick={() => handleDrawer(infoSelected === InfoAreaType.APPROVERS ? '' : InfoAreaType.APPROVERS)}
                button
              >
                <ListItemIcon className={classes.listIcon}>
                  <PeopleIcon />
                </ListItemIcon>
              </ListItem>
            </List>
          </div>
        </div>
        <InfoArea selected={infoSelected} />
      </div>
    </Drawer>
  );
};

export default RightMenu;
