import React, { useState, useRef, useEffect, FC } from 'react';
import { Layer, Stage } from 'react-konva';
import { useQuery } from 'relay-hooks';
import graphql from 'babel-plugin-relay/macro';
import ImageComponent from './Image';
import NoteSelector from './NoteSelector';
import { useParams } from 'react-router-dom';
import { StageComponentQuery } from './__generated__/StageComponentQuery.graphql';
import useLocal from '../../relay/useLocal';
import { makeStyles } from '@material-ui/core/styles';
import { AppTheme } from '../../theme';
import { onMouseDown, onMouseMove, onMouseUp } from './helperFunctions';
import { Markup } from '../../Types';
import AddNote from '../AddNoteDialog';

const useStyles = makeStyles((theme: AppTheme) => ({
  root: {
    height: `calc( 100% - ${theme.mixins.toolbar.minHeight}px)`,
  },
}));

const query = graphql`
  query StageComponentQuery($approvalId: String!) {
    approval(approvalId: $approvalId) {
      notes {
        id
        markup
      }
      assets {
        asset
        assetUrl
      }
    }
  }
`;

const StageComponent: FC<{}> = ({ children }) => {
  const stageRef = useRef<Stage>(null);
  const stageWrapperRef = useRef<HTMLDivElement>(null);
  const classes = useStyles();

  const [color] = useLocal('tool_selectedColor');
  const [noteType] = useLocal('tool_selectedNoteType');
  const [scale, setScale] = useLocal('stage_scale');
  const [width, setWidth] = useLocal('stage_stageWidth');
  const [height, setHeight] = useLocal('stage_stageHeight');
  const [setImageWidth] = useLocal('stage_imageWidth', 'action');
  const [setImageHeight] = useLocal('stage_imageHeight', 'action');
  const [isImageDrawing] = useLocal('shotcuts_isImageDrawing');
  const [toogleOpenAddNoteDialog] = useLocal('dialogs_addNote', 'action');

  const [isDrawing, toggleDrawing] = useState<boolean>(false);
  const [markup, setMarkup] = useState<Markup>({
    type: noteType,
    color: color,
    content: {},
  });

  const { id } = useParams();

  const { props } = useQuery<StageComponentQuery>(
    query,
    { approvalId: id },
    {
      fetchPolicy: 'store-only',
    },
  );
  let url = '';

  if (
    props &&
    props.approval &&
    props.approval.assets &&
    props.approval.assets.length &&
    props.approval.assets[0].assetUrl
  )
    url = props.approval.assets[0].assetUrl;

  useEffect(() => {
    const checkSize = () => {
      if (stageWrapperRef.current) {
        setWidth(stageWrapperRef.current.offsetWidth);
        setHeight(stageWrapperRef.current.offsetHeight);
      }
    };
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, [setHeight, setWidth]);

  useEffect(() => {
    setMarkup({ ...markup, color, type: noteType });
  }, [color]);

  useEffect(() => {
    setMarkup({ content: {}, color, type: noteType });
  }, [noteType]);

  const handelAddNoteCallback = () => {
    setMarkup({
      type: noteType,
      color: color,
      content: {},
    });
    toogleOpenAddNoteDialog(false);
  };

  return (
    <div className={classes.root} ref={stageWrapperRef}>
      <Stage
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
            toggleDrawing: toggleDrawing,
            toogleOpenAddNoteDialog: toogleOpenAddNoteDialog,
          })
        }
      >
        <Layer>
          <ImageComponent
            url={url}
            height={height}
            width={width}
            setHeight={setHeight}
            setWidth={setWidth}
            setImageHeight={setImageHeight}
            setImageWidth={setImageWidth}
            setScale={setScale}
          />
        </Layer>
        <Layer>
          {markup && <NoteSelector markup={markup} />}
          {props &&
            props.approval &&
            props.approval.notes &&
            props.approval.notes.map((item) => <NoteSelector key={item.id} markup={item.markup as Markup} />)}
        </Layer>
      </Stage>
      <AddNote callback={handelAddNoteCallback} id={id} markup={markup} />
    </div>
  );
};

export default StageComponent;
