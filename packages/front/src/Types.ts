import Konva from 'konva';

export enum MarkupType {
  LINE = 'line',
  SQUARE = 'square',
  CIRCLE = 'circle',
}

export type MarkupLine = {
  points: Konva.Vector2d[];
};

export type MarkupSquare = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type MarkupCircle = {
  x: number;
  y: number;
  radius: number;
};

export type Markup = {
  color: string;
  type: MarkupType;
  content: MarkupCircle | MarkupSquare | MarkupLine | {};
};
