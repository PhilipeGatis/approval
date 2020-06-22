import { Entity, OneToMany, ManyToOne, Column, CreateDateColumn } from 'typeorm';
import { Comment } from '@approval/server/entities/comment';
import { Approval } from '@approval/server/entities/approval';
import { Field, ObjectType } from 'type-graphql';
import { RelationColumn } from '@approval/server/common/utils';
import { Base } from '@approval/server/entities/base';
import { GraphQLJSONObject } from 'graphql-type-json';

@Entity()
@ObjectType()
export class Note extends Base {
  @Field(() => String)
  @Column()
  createdBy!: string;

  @Field(() => String)
  @Column()
  text!: string;

  @Field(() => GraphQLJSONObject)
  @Column('simple-json')
  markup!: typeof GraphQLJSONObject;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field((type) => Approval)
  @ManyToOne((type) => Approval, (approval: Approval) => approval.notes)
  approval!: Approval;

  @RelationColumn()
  approvalId!: string;

  @Field((type) => [Comment], { nullable: true })
  @OneToMany((type) => Comment, (comment: Comment) => comment.note)
  comments!: Comment[];
}
