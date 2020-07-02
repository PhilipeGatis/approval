import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import GestureIcon from '@material-ui/icons/Gesture';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import ColorPicker from '../components/ColorPicker';
import Drawer from '@material-ui/core/Drawer';
import { MarkupType } from '../Types';
import useLocal from '../relayComponents/useLocal';
import ZoomControl from '../components/ZoomControl';
import { makeStyles } from '@material-ui/core/styles';
import { AppTheme } from '../theme';

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
    borderRadius: '0px 10px 10px 0px',
  },
}));

const LeftMenu = () => {
  const [nodeType, setNodeType] = useLocal('tool_selectedNoteType');
  const classes = useStyles();

  const handleNoteType = (type: MarkupType) => {
    setNodeType(type);
  };

  return (
    <Drawer
      classes={{
        paper: classes.paper,
      }}
      anchor="left"
      variant="permanent"
      open
    >
      <div className={classes.list} role="presentation">
        <List>
          <ListItem
            selected={nodeType === MarkupType.LINE.toString()}
            onClick={() => handleNoteType(MarkupType.LINE)}
            button
          >
            <ListItemIcon>
              <GestureIcon />
            </ListItemIcon>
          </ListItem>
          <ListItem
            selected={nodeType === MarkupType.CIRCLE.toString()}
            onClick={() => handleNoteType(MarkupType.CIRCLE)}
            button
          >
            <ListItemIcon>
              <RadioButtonUncheckedIcon />
            </ListItemIcon>
          </ListItem>
          <ListItem
            selected={nodeType === MarkupType.SQUARE.toString()}
            onClick={() => handleNoteType(MarkupType.SQUARE)}
            button
          >
            <ListItemIcon>
              <CheckBoxOutlineBlankIcon />
            </ListItemIcon>
          </ListItem>
          <Divider />
          <ColorPicker />
          <ZoomControl />
        </List>
      </div>
    </Drawer>
  );
};

export default LeftMenu;
