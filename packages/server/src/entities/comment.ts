import { Entity, ManyToOne, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';
import { Note } from '@approval/server/entities/note';
import { Field, ObjectType } from 'type-graphql';
import { RelationColumn } from '@approval/server/common/utils';
import { Base } from '@approval/server/entities/base';

@Entity()
@ObjectType()
export class Comment extends Base {
  @Field(() => String)
  @Column()
  createdBy!: string;

  @Field(() => String)
  @Column()
  text!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updateddAt!: Date;

  @Field((type) => Note)
  @ManyToOne((type) => Note, (note: Note) => note.comments)
  note!: Note;

  @RelationColumn()
  noteId!: string;
}
