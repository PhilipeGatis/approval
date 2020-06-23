import { Entity, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Approval } from '@approval/server/entities/approval';
import { RelationColumn } from '@approval/server/common/utils';
import { Field, ObjectType } from 'type-graphql';
import { Base } from '@approval/server/entities/base';

@Entity()
@ObjectType()
export class Approver extends Base {
  @Field(() => Boolean)
  @Column({ default: false })
  isApproved!: boolean;

  @Field(() => Boolean)
  @Column({ default: false })
  isRequeried!: boolean;

  @Field(() => String)
  @Column()
  login!: string;

  @Field(() => String)
  @Column()
  name!: string;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field((type) => Approval)
  @ManyToOne((type) => Approval, (approval: Approval) => approval.approvers)
  approval!: Approval;

  @RelationColumn()
  approvalId!: string;
}
