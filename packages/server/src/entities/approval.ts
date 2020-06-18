import { Entity, Column, CreateDateColumn, OneToMany, BaseEntity } from 'typeorm'
import { Note } from '@approval/server/entities/note'
import { Approver } from '@approval/server/entities/approver'
import { Asset } from '@approval/server/entities/asset'
import { ApprovalStrategyEnum, ApprovalStatusEnum } from '@approval/server/common/types'
import { ObjectType, Field, registerEnumType } from 'type-graphql'
import { Base } from '@approval/server/entities/base'

registerEnumType(ApprovalStrategyEnum, {
  name: 'ApprovalStrategyEnum',
  description: 'All possible strategies'
})

registerEnumType(ApprovalStatusEnum, {
  name: 'ApprovalStatusEnum',
  description: 'All possible status'
})

@Entity()
@ObjectType()
export class Approval extends Base {
    @Field(type => ApprovalStrategyEnum)
    @Column({
      type: 'enum',
      enum: ApprovalStrategyEnum,
      default: ApprovalStrategyEnum.ONE
    })
    strategy!: ApprovalStrategyEnum;

    @Field(() => String)
    @Column()
    from!: string;

    @Field(() => String, { nullable: true })
    @Column()
    createdBy!: string;

    @Field(() => String)
    @CreateDateColumn()
    createdAt!: Date;

    @Field(() => String)
    @CreateDateColumn()
    dueDate!: Date;

    @Field(type => ApprovalStatusEnum)
    @Column({
      type: 'enum',
      enum: ApprovalStatusEnum,
      default: ApprovalStatusEnum.OPEN
    })
    status!: string;

    @Field(() => [Asset], { nullable: true })
    @OneToMany(() => Asset, (asset: Asset) => asset.approval)
    assets!: Asset[];

    @Field(() => [Note], { nullable: true })
    @OneToMany(() => Note, (note: Note) => note.approval)
    notes!: Note[];

    @Field(() => [Approver], { nullable: true })
    @OneToMany(() => Approver, (approver: Approver) => approver.approval)
    approvers!: Approver[];

    @Field(() => Boolean)
    isCanApprove!: false;
}
