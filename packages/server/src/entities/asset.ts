import { Entity, Column, OneToMany } from 'typeorm'
import { Approval } from '@approval/server/entities/approval'
import { Field, ObjectType } from 'type-graphql'
import { RelationColumn } from '@approval/server/common/utils'
import { Base } from '@approval/server/entities/base'

@Entity()
@ObjectType()
export class Asset extends Base {
    @Field(() => String)
    @Column()
    asset!: string;

    @Field(() => String)
    @Column()
    assetUrl!: string;

    @Field(type => Approval)
    @OneToMany(type => Approval, (approval: Approval) => approval.assets)
    approval!: Approval;

    @RelationColumn()
    approvalId!: string;
}
