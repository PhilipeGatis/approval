import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import GestureIcon from '@material-ui/icons/Gesture';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import ColorPicker from '../components/ColorPicker';
import DrawerTools from '../components/DrawerTools';
import { MarkupType } from '../Types';
import useLocal from '../relay/useLocal';

const LeftMenu = () => {
  const [nodeType, setNodeType] = useLocal('tool_selectedNoteType');

  const handleNoteType = (type: MarkupType) => {
    setNodeType(type);
  };

  return (
    <DrawerTools anchor="left">
      <List>
        <ListItem selected={nodeType === MarkupType.LINE.toString()} onClick={() => handleNoteType(MarkupType.LINE)} button>
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
      </List>
    </DrawerTools>
  );
};

export default LeftMenu;
