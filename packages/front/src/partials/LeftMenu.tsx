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
import useStore, { NoteType } from '../store';

const LeftMenu = () => {
  const noteType = useStore((state) => state.selectedNoteType);
  const setNoteType = useStore((state) => state.setNoteType);

  const handleNoteType = (type: NoteType) => {
    setNoteType(type);
  };

  return (
    <DrawerTools anchor="left">
      <List>
        <ListItem
          selected={noteType === NoteType.LINE}
          onClick={() => handleNoteType(NoteType.LINE)}
          button
        >
          <ListItemIcon>
            <GestureIcon />
          </ListItemIcon>
        </ListItem>
        <ListItem
          selected={noteType === NoteType.CIRCLE}
          onClick={() => handleNoteType(NoteType.CIRCLE)}
          button
        >
          <ListItemIcon>
            <RadioButtonUncheckedIcon />
          </ListItemIcon>
        </ListItem>
        <ListItem
          selected={noteType === NoteType.SQUARE}
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
