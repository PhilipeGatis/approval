import { Root, Resolver, Subscription, Arg } from 'type-graphql'
import { Approver } from '@approval/server/entities/approver'
import { Approval } from '@approval/server/entities/approval'
import { Comment } from '@approval/server/entities/comment'
import { Asset } from '@approval/server/entities/asset'
import { UpdateInfo } from '@approval/server/entities/updateInfo'
import { Note } from '@approval/server/entities/note'
import { InjectManager } from 'typeorm-typedi-extensions'
import { EntityManager } from 'typeorm'

interface UpdateInfoPayload {
  entityName: string
  id: string
}

@Resolver(UpdateInfo)
export class UpdateInfoResolver {

  constructor (
    @InjectManager() private readonly entityManager: EntityManager
  ) {}

  @Subscription(returns => UpdateInfo ,{
    topics: 'UPDATE_INFO',
    filter: ({ payload, args }) => payload.approvalId === args.approvalId
  })
  async updateInfoSubscription (
    @Root() updateInfoPayload: UpdateInfoPayload,
    @Arg('approvalId', type => String) approvalId: string
  ) {
    const updateInfo = new UpdateInfo()
    switch (updateInfoPayload.entityName) {
      case 'Note':
        updateInfo.notes = await this.entityManager.find(Note,{ where: { approvalId: updateInfoPayload.id } })
        break;
      case 'Comment':
        updateInfo.comments = await this.entityManager.find(Comment,{  where: { noteId: updateInfoPayload.id } })
        break;
      case 'Approver':
        updateInfo.approvers = await this.entityManager.find(Approver,{  where: { approvalId: updateInfoPayload.id } })
        break;
      case 'Assets':
        updateInfo.assets = await this.entityManager.find(Asset,{  where: { approvalId: updateInfoPayload.id } })
        break;
      default:
        updateInfo.approval = await this.entityManager.findOne(Approval,{  where: { approvalId: updateInfoPayload.id } })
    }
    return updateInfo
  }

}