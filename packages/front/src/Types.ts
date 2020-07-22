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
};
