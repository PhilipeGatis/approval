export enum NoteType {
  LINE = 'line',
  SQUARE = 'square',
  CIRCLE = 'circle',
}

export type ToolProps = {
  selectedNoteType: NoteType;
  selectedColor: string;
};

export type ShotcutsProps = {
  isImageDrawing: boolean;
};

export type StageProps = {
  scale?: number;
  stageWidth: number;
  stageHeight: number;
};

export type Size = {
  width: number;
  height: number;
};