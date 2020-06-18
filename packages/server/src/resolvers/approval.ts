import { Resolver, Query, Arg, Mutation, InputType, Field, Root, FieldResolver, Ctx } from 'type-graphql'
import { Approval } from '@approval/server/entities/approval'
import { InjectManager } from 'typeorm-typedi-extensions'
import { EntityManager } from 'typeorm'
import { Approver } from '@approval/server/entities/approver'
import { Note } from '@approval/server/entities/note'
import { Asset } from '@approval/server/entities/asset'
import { Context } from '@approval/server/common/types'

@InputType()
class AssetInput implements Partial<Asset> {
  @Field()
  asset!: string;

  @Field()
  assetUrl!: string;
}

@InputType()
class ApproverInput implements Partial<Approver> {
  @Field()
  login!: string;

  @Field()
  name!: string;

  @Field(type => Boolean)
  isRequeried = true;
}

@InputType()
class ApprovalInput implements Partial<Approval> {
  @Field()
  from!: string;

  @Field(() => [ApproverInput])
  approvers!: Approver[];

  @Field(() => [AssetInput])
  assets!: Asset[];
}

@Resolver(Approval)
export class ApprovalResolver {
  constructor (
    @InjectManager() private readonly entityManager: EntityManager
  ) {}

  @Query(returns => Approval, { nullable: true })
  approval (@Arg('approvalId', type => String) approvalId: string) {
    return this.entityManager.findOne(Approval, approvalId)
  }

  @Query(returns => [Approval])
  approvals (): Promise<Approval[]> {
    return this.entityManager.find(Approval)
  }

  @Mutation(returns => Approval)
  async addApproval (
    @Arg('approval') approvalInput: ApprovalInput,
    @Ctx() { user }: Context
  ): Promise<Approval> {
    return await this.entityManager.transaction(async transactionalEntityManager => {
      const approval = transactionalEntityManager.create(Approval, { createdBy: user?.login, ...approvalInput })
      const result = await transactionalEntityManager.save(Approval, approval)

      approval.approvers.forEach( approver => approver.approvalId = approval.id )
      approval.assets.forEach( asset => asset.approvalId = approval.id )

      await transactionalEntityManager.save(Approver, approval.approvers)
      await transactionalEntityManager.save(Asset, approval.assets)
      return result
    })
  }

  @FieldResolver()
  approvers (@Root() approval: Approval) {
    return this.entityManager.find(Approver, {
      cache: 1000,
      where: { approvalId: approval.id }
    })
  }

  @FieldResolver()
  assets (@Root() approval: Approval) {
    return this.entityManager.find(Asset, {
      cache: 1000,
      where: { approvalId: approval.id }
    })
  }

  @FieldResolver()
  notes (@Root() approval: Approval) {
    return this.entityManager.find(Note, {
      cache: 1000,
      where: { approvalId: approval.id }
    })
  }

  @FieldResolver()
  isCanApprove (
    @Root() approval: Approval,
    @Ctx() { user }: Context
  ) {
    return this.entityManager.findAndCount(Approver, {
      cache: 1000,
      where: { approvalId: approval.id, login: user?.login }
    }).then(result => {
      return result[1] || false
    })
  }
}
