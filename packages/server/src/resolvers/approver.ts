import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Ctx,
  InputType,
  Field,
  FieldResolver,
  Root,
  PubSub
} from 'type-graphql'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Repository } from 'typeorm'
import { Approver } from '@approval/server/entities/approver'
import { Approval } from '@approval/server/entities/approval'
import { Context } from '@approval/server/common/types'
import {PubSubEngine} from "graphql-subscriptions";


@InputType()
class ApproveInput implements Partial<Approver> {
  @Field()
  approved!: boolean;

  @Field()
  approvalId!: string;
}

@Resolver(Approver)
export class ApproverResolver {
  constructor (
    @InjectRepository(Approver) private readonly approverRepository: Repository<Approver>,
    @InjectRepository(Approval) private readonly approvalRepository: Repository<Approval>
  ) {}

  @Query(returns => [Approver])
  approvers (@Arg('approvalId', type => String) approvalId: string): Promise<Approver[]> {
    return this.approverRepository.find({ where: { approvalId: approvalId } })
  }

  @Query(returns => Approver, { nullable: true })
  approver (@Arg('approverId', type => String) approverId: string) {
    return this.approverRepository.findOne(approverId)
  }

  @Mutation(returns => Approver)
  async approve (
    @PubSub() pubSub: PubSubEngine,
    @Arg('approved') approveInput: ApproveInput,
    @Ctx() { user }: Context
  ) {
    const approver = await this.approverRepository.findOne({ where: { approvalId: approveInput.approvalId, login: user?.login } })
    if (approver) {
      await this.approverRepository.update(
        approver.id,
        { isApproved: approveInput.approved }
      )
    }
    await pubSub.publish('UPDATE_INFO', { approvalId: approveInput.approvalId, id: approveInput.approvalId, entityName: 'Approver' })
    return await this.approverRepository.findOne({ approvalId: approveInput.approvalId })
  }

  @FieldResolver()
  approval (@Root() approver: Approver) {
    return this.approvalRepository.findOne({
      cache: 1000,
      where: { id: approver.approvalId }
    })
  }
}
