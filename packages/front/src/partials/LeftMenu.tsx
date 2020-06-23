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
import { NoteType } from '../Types';
import useLocal from '../relay/useLocal';

const LeftMenu = () => {
  const [nodeType, setNodeType] = useLocal('tool_selectedNoteType');

  const handleNoteType = (type: NoteType) => {
    setNodeType(type);
  };

  return (
    <DrawerTools anchor="left">
      <List>
        <ListItem selected={nodeType === NoteType.LINE.toString()} onClick={() => handleNoteType(NoteType.LINE)} button>
          <ListItemIcon>
            <GestureIcon />
          </ListItemIcon>
        </ListItem>
        <ListItem
          selected={nodeType === NoteType.CIRCLE.toString()}
          onClick={() => handleNoteType(NoteType.CIRCLE)}
          button
        >
          <ListItemIcon>
            <RadioButtonUncheckedIcon />
          </ListItemIcon>
        </ListItem>
        <ListItem
          selected={nodeType === NoteType.SQUARE.toString()}
          onClick={() => handleNoteType(NoteType.SQUARE)}
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
