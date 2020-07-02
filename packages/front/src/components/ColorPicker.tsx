import React, { useRef, useState, FC } from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Popover from '@material-ui/core/Popover';
import { Color, SketchPicker } from 'react-color';
import ListItem from '@material-ui/core/ListItem';
import useLocal from '../relayComponents/useLocal';
import SvgIcon from '@material-ui/core/SvgIcon';

interface Props {
  color: string;
}

const Icon: FC<Props> = ({ color }) => (
  <SvgIcon>
    <path d="M17.75 7L14 3.25l-10 10V17h3.75l10-10zm2.96-2.96c.39-.39.39-1.02 0-1.41L18.37.29a.9959.9959 0 0 0-1.41 0L15 2.25 18.75 6l1.96-1.96z" />
    <path fill={color} stroke="currentColor" strokeWidth="0.5" d="M0 20h24v4H0z" />
  </SvgIcon>
);

const ColorPicker = () => {
  const anchorRef = useRef(null);
  const [color, updateColor] = useLocal('tool_selectedColor');

  const [showColorPicker, toogleColorPicker] = useState(false);
  const [localColor, setLocalColor] = useState<Color>(color);

  const handleColorChange = () => {
    updateColor(localColor);
  };

  return (
    <>
      <ListItem ref={anchorRef} onClick={() => toogleColorPicker(!showColorPicker)} button>
        <ListItemIcon>
          <Icon color={color} />
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
          onChangeComplete={handleColorChange}
          onChange={(color) => setLocalColor(color.hex)}
          disableAlpha
        />
      </Popover>
    </>
  );
};

export default ColorPicker;
