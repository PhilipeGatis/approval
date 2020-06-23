import React, { useRef, useState, Fragment } from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import Popover from '@material-ui/core/Popover';
import { Color, SketchPicker } from 'react-color';
import ListItem from '@material-ui/core/ListItem';
import useLocal from '../relay/useLocal';

const ColorPicker = () => {
  const anchorRef = useRef(null);
  const [color, updateColor] = useLocal('tool_selectedColor')

  const [showColorPicker, toogleColorPicker] = useState(false);
  const [localColor, setLocalColor] = useState<Color>(color);

  const handleColorChange = () => {
    updateColor(localColor);
  };

  return (
    <Fragment>
      <ListItem ref={anchorRef} onClick={() => toogleColorPicker(!showColorPicker)} button>
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
          onChange={(color) => setLocalColor(color.hex)}
          disableAlpha
        />
      </Popover>
    </Fragment>
  );
};

export default ColorPicker;
