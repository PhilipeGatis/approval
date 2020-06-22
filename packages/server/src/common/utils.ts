import { ColumnOptions, Column } from 'typeorm';

export function RelationColumn(options?: ColumnOptions) {
  return Column({ nullable: true, ...options });
}
