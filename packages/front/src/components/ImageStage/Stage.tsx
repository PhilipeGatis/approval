import React, { useState, useRef, useEffect, FC } from 'react';
import { Layer, Stage } from 'react-konva';
import ImageComponent from './Image';
import NoteSelector from './MarkupSelector';
import useLocal from '../../relayComponents/useLocal';
import useNotesQuery from '../../relayComponents/useNotesQuery';
import { makeStyles } from '@material-ui/core/styles';
import { AppTheme } from '../../theme';
import { onMouseDown, onMouseMove, onMouseUp } from './helperFunctions';
import { Markup } from './Types';
import AddNote from '../AddNoteDialog';
// @ts-ignore
import useResizeAware from 'react-resize-aware';

const useStyles = makeStyles((theme: AppTheme) => ({
  root: {
    height: '100%',
  },
}));

interface PosProps {
  x: number;
  y: number;
}

interface Props {
  image?: HTMLImageElement;
  pos: PosProps;
}

const StageComponent: FC<Props> = ({ image, pos }) => {
  const stageRef = useRef<Stage>(null);
  const [resizeListener, sizes] = useResizeAware();
  const classes = useStyles();

  const [color] = useLocal('tool_selectedColor');
  const [noteType] = useLocal('tool_selectedNoteType');
  const [scale, setScale] = useLocal('stage_scale');
  const [width, setWidth] = useLocal('stage_stageWidth');
  const [height, setHeight] = useLocal('stage_stageHeight');
  const [isImageDrawing] = useLocal('shotcuts_isImageDrawing');
  const [toogleOpenAddNoteDialog] = useLocal('dialogs_addNote', 'action');

  const notes = useNotesQuery();

  const [isDrawing, toggleDrawing] = useState<boolean>(false);
  const [markup, setMarkup] = useState<Markup>({
    type: noteType,
    color: color,
    content: {},
  });

  useEffect(() => {
    if (sizes.height > 0 && sizes.width > 0) {
      setHeight(sizes.height);
      setWidth(sizes.width);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sizes]);

  useEffect(() => {
    setMarkup({ ...markup, color, type: noteType });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color, noteType]);

  const handelAddNoteCallback = () => {
    clearMarkup();
    toogleOpenAddNoteDialog(false);
  };

  const clearMarkup = () => {
    setMarkup({
      type: noteType,
      color: color,
      content: {},
    });
  };

  return (
    <div className={classes.root}>
      {resizeListener}
      <Stage
        x={pos?.x}
        y={pos?.y}
        ref={stageRef}
        width={width}
        height={height}
        scaleX={scale}
        scaleY={scale}
        draggable={isImageDrawing}
        onMouseDown={(e) =>
          onMouseDown({
            event: e,
            isImageDrawing,
            toggleDrawing: toggleDrawing,
            setMarkup: setMarkup,
            markup,
          })
        }
        onMouseMove={(e) =>
          onMouseMove({
            event: e,
            isImageDrawing,
            isDrawing,
            markup,
            setMarkup,
          })
        }
        onMouseUp={(e) =>
          onMouseUp({
            event: e,
            isImageDrawing,
            isDrawing,
            markup,
            clearMarkup,
            toggleDrawing: toggleDrawing,
            toogleOpenAddNoteDialog: toogleOpenAddNoteDialog,
          })
        }
      >
        <Layer>
          <ImageComponent image={image} height={height} width={width} setScale={setScale} />
        </Layer>
        <Layer>
          {markup && <NoteSelector markup={markup} />}
          {notes.map((item) => (
            <NoteSelector key={item.id} markup={item.markup as Markup} />
          ))}
        </Layer>
      </Stage>
      <AddNote callback={handelAddNoteCallback} markup={markup} />
    </div>
  );
};

export default StageComponent;
