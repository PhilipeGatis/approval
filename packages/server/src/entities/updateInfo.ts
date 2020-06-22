import { Comment } from '@approval/server/entities/comment';
import { Approval } from '@approval/server/entities/approval';
import { Field, ObjectType } from 'type-graphql';
import { Approver } from '@approval/server/entities/approver';
import { Asset } from '@approval/server/entities/asset';
import { Note } from '@approval/server/entities/note';

@ObjectType()
export class UpdateInfo {
  @Field(() => Approval, { nullable: true })
  approval!: Approval | undefined;

  @Field(() => [Approver], { nullable: true })
  approvers!: Approver[];

  @Field(() => [Asset], { nullable: true })
  assets!: Asset[];

  @Field(() => [Note], { nullable: true })
  notes!: Note[];

  @Field(() => [Comment], { nullable: true })
  comments!: Comment[];
}
