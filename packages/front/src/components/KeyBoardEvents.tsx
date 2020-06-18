import React, { useCallback, FC } from 'react';
import { HotKeys, KeyMap } from 'react-hotkeys';
import useStore from '../store';

const KeyBoardEvents: FC<{}> = ({ children }) => {
  const setImageDrag = useStore((state) => state.setImageDrag);
  const keymap: KeyMap = {
    COMMAND_DOWN: { sequence: 'command', action: 'keydown' },
    COMMAND_UP: { sequence: 'command', action: 'keyup' },
  };

  const handlers = {
    COMMAND_DOWN: useCallback(() => {
      setImageDrag(true);
    }, [setImageDrag]),
    COMMAND_UP: useCallback(() => {
      setImageDrag(false);
    }, [setImageDrag]),
  };

  return (
    <HotKeys keyMap={keymap} handlers={handlers}>
      {children}
    </HotKeys>
  );
};

export default KeyBoardEvents;
