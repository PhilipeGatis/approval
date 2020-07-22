import Konva from 'konva';
import { Markup, MarkupLine, MarkupSquare, MarkupCircle, MarkupType } from './Types';

export interface Attributes extends Konva.Vector2d {
  scale: number;
}

const limitAttributes = (stage: Konva.Stage, newAttrs: Attributes) => {
  const box = stage.findOne('Image').getClientRect();
  const minX = -box.width + stage.width() / 2;
  const maxX = stage.width() / 2;

  const x = Math.max(minX, Math.min(newAttrs.x, maxX));

  const minY = -box.height + stage.height() / 2;
  const maxY = stage.height() / 2;

  const y = Math.max(minY, Math.min(newAttrs.y, maxY));

  const scale = Math.max(0.05, newAttrs.scale);

  return { x, y, scale };
};

const getRelativePointerPosition = (node: Konva.Node | null) => {
  if (!node) return;
  const transform = node.getAbsoluteTransform().copy();
  transform.invert();
  // @ts-ignore
  const pos = node.getStage().getPointerPosition();
  // @ts-ignore
  return transform.point(pos);
};

const getReadius = (p1: Konva.Vector2d | undefined, p2: Konva.Vector2d | undefined) => {
  if (!p1 || (p1 && !p1.x && !p1.y && !p2) || !p2 || (p2 && !p2.x && !p2.y)) return 0;
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)) / 2;
};

interface OnMouseDownProps {
  event: Konva.KonvaEventObject<MouseEvent>;
  toggleDrawing: Function;
  isImageDrawing: boolean;
  setMarkup: Function;
  markup: Markup;
}

export const onMouseDown = ({ event, isImageDrawing, toggleDrawing, setMarkup, markup }: OnMouseDownProps) => {
  if (isImageDrawing) return;
  toggleDrawing(true);
  const point = getRelativePointerPosition(event.target.getStage());
  let content = {};
  switch (markup.type) {
    case MarkupType.LINE:
      content = {
        points: [point],
      };
      break;
    case MarkupType.SQUARE:
      content = {
        x: point?.x,
        y: point?.y,
      };
      break;
    case MarkupType.CIRCLE:
      content = {
        x: point?.x,
        y: point?.y,
      };
      break;
  }
  setMarkup({ ...markup, content });
};

interface OnMouseMoveProps {
  event: Konva.KonvaEventObject<MouseEvent>;
  isDrawing: boolean;
  isImageDrawing: boolean;
  markup: Markup;
  setMarkup: Function;
}

export const onMouseMove = ({ event, isImageDrawing, isDrawing, markup, setMarkup }: OnMouseMoveProps) => {
  if (!isDrawing || isImageDrawing) {
    return;
  }

  let content = null;

  const point = getRelativePointerPosition(event.target.getStage());

  if (markup.type === MarkupType.LINE) {
    const contentLine = markup.content as MarkupLine;
    if (!point) return;
    contentLine.points = [...contentLine.points, point];
    content = contentLine;
  }

  if (markup.type === MarkupType.SQUARE) {
    const contentSquare = markup.content as MarkupSquare;
    contentSquare.width = Math.max((point ? point.x : 0) - contentSquare.x);
    contentSquare.height = Math.max((point ? point.y : 0) - contentSquare.y);
    content = contentSquare;
  }

  if (markup.type === MarkupType.CIRCLE) {
    const contentCircle = markup.content as MarkupCircle;
    contentCircle.radius = getReadius(
      {
        x: contentCircle.x,
        y: contentCircle.y,
      },
      point,
    );
    content = contentCircle;
  }
  setMarkup({ ...markup, content });
};

interface OnMouseUpProps {
  event: Konva.KonvaEventObject<MouseEvent>;
  toggleDrawing: Function;
  toogleOpenAddNoteDialog: Function;
  clearMarkup: Function;
  isImageDrawing: boolean;
  markup: Markup;
  isDrawing: boolean;
}

export const onMouseUp = ({
  event,
  isDrawing,
  isImageDrawing,
  toggleDrawing,
  toogleOpenAddNoteDialog,
  markup,
  clearMarkup,
}: OnMouseUpProps) => {
  if (!isDrawing || isImageDrawing) {
    return;
  }
  if (markup.type === MarkupType.LINE) {
    const contentLine = markup.content as MarkupLine;
    if (contentLine.points.length < 3) {
      toggleDrawing(false);
      clearMarkup();
      return;
    }
  }

  if (markup.type === MarkupType.SQUARE) {
    const contentSquare = markup.content as MarkupSquare;
    if ((!contentSquare.width || contentSquare.width < 3) && (!contentSquare.height || contentSquare.height < 3)) {
      toggleDrawing(false);
      clearMarkup();
      return;
    }
  }

  if (markup.type === MarkupType.CIRCLE) {
    const contentCircle = markup.content as MarkupCircle;
    if (!contentCircle.radius || contentCircle.radius < 3) {
      toggleDrawing(false);
      clearMarkup();
      return;
    }
  }

  toggleDrawing(false);
  toogleOpenAddNoteDialog(true);
};
