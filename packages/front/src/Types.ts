import Konva from 'konva';

export enum InfoAreaType {
  NOTES = 'notes',
  APPROVERS = 'approvers',
}

export enum MarkupType {
  LINE = 'line',
  SQUARE = 'square',
  CIRCLE = 'circle',
}

export type Comments = {
  id: string;
  text: string;
};

export type Note = {
  id: string;
  createdAt: unknown;
  createdBy: string;
  markup: unknown;
  text: string;
  comments?: Comments[];
};

export type Approver = {
  id: string;
  isRequeried: boolean;
  login: string;
  name: string;
  isApproved: boolean;
};

export type Asset = {
  assetUrl: string;
  asset: string;
};

export type Approval = {
  id: string;
  dueDate: string;
  isCanApprove: boolean;
  assets: Asset[];
  approvers: Approver[];
  notes: Note[];
};

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
