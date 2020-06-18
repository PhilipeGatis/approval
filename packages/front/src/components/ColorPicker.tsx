import React, { useRef, useState, Fragment } from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import Popover from '@material-ui/core/Popover';
import { SketchPicker } from 'react-color';
import ListItem from '@material-ui/core/ListItem';
import useStore from '../store';

const ColorPicker = () => {
  const anchorRef = useRef(null);

  const selectedColor = useStore((state) => state.selectedColor);
  const setColor = useStore((state) => state.setColor);

  const [showColorPicker, toogleColorPicker] = useState(false);
  const [localColor, setLocalColor] = useState(selectedColor);

  const handleColorChange = () => {
    setColor(localColor);
  };

  return (
    <Fragment>
      <ListItem
        ref={anchorRef}
        onClick={() => toogleColorPicker(!showColorPicker)}
        button
      >
        <ListItemIcon>
          <BorderColorIcon />
        </ListItemIcon>
      </ListItem>
      <Popover
        anchorEl={anchorRef.current}
        open={showColorPicker}
        onBackdropClick={() => toogleColorPicker(!showColorPicker)}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
        <SketchPicker
          color={localColor}
          onChangeComplete={() => handleColorChange}
          onChange={(color) => setLocalColor(color)}
          disableAlpha
        />
      </Popover>
    </Fragment>
  );
};

export default ColorPicker;
