import React, { useCallback, FC } from 'react';
import { HotKeys, KeyMap } from 'react-hotkeys';
import useLocal from '../relay/useLocal';

const KeyBoardEvents: FC<{}> = ({ children }) => {
  const [toogleIsImageDrawing] = useLocal('shotcuts_isImageDrawing', 'action');

  const keymap: KeyMap = {
    COMMAND_DOWN: { sequence: 'command', action: 'keydown' },
    COMMAND_UP: { sequence: 'command', action: 'keyup' },
  };

  const handlers = {
    COMMAND_DOWN: useCallback(() => {
      toogleIsImageDrawing(true);
    }, [toogleIsImageDrawing]),
    COMMAND_UP: useCallback(() => {
      toogleIsImageDrawing(false);
    }, [toogleIsImageDrawing]),
  };

  return (
    <HotKeys keyMap={keymap} handlers={handlers}>
      {children}
    </HotKeys>
  );
};

export default KeyBoardEvents;
