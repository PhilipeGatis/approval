export enum ApprovalStrategyEnum {
  ALL = 'all',
  ONE = 'one',
  PARTIAL = 'partial',
}

export enum ApprovalStatusEnum {
  OPEN = 'open',
  EXPIRED = 'expired',
  CLOSED = 'closed',
}

export interface Context {
  user?: User;
}

export interface User {
  name: string;
  login: string;
}
