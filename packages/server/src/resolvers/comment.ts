import { Resolver, Query, Arg, Mutation, InputType, Field, Root, FieldResolver, Ctx, PubSub } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';
import { Comment } from '@approval/server/entities/comment';
import { Note } from '@approval/server/entities/note';
import { Context } from '@approval/server/common/types';
import { PubSubEngine } from 'graphql-subscriptions';

@InputType()
class CommentInput implements Partial<Comment> {
  @Field()
  text!: string;

  @Field()
  noteId!: string;
}

@Resolver(Comment)
export class CommentResolver {
  constructor(
    @InjectRepository(Comment) private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Note) private readonly noteRepository: Repository<Note>,
  ) {}

  @Query((returns) => Comment, { nullable: true })
  comment(@Arg('commentId', (type) => String) commentId: string) {
    return this.commentRepository.findOne(commentId);
  }

  @Query((returns) => [Comment])
  comments(@Arg('noteId', (type) => String) noteId: string): Promise<Comment[]> {
    return this.commentRepository.find({ where: { noteId: noteId } });
  }

  @Mutation((returns) => Comment)
  async addComment(
    @PubSub() pubSub: PubSubEngine,
    @Arg('comment') commentInput: CommentInput,
    @Ctx() { user }: Context,
  ): Promise<Comment> {
    const comment = await this.commentRepository.create({ createdBy: user?.login, ...commentInput });
    await this.commentRepository.save(comment);
    const note = await this.noteRepository.findOne(comment.noteId);
    if (note)
      await pubSub.publish('UPDATE_INFO', { approvalId: note.approvalId, id: comment.noteId, entityName: 'Comment' });
    return comment;
  }

  @FieldResolver()
  note(@Root() comment: Comment) {
    return this.noteRepository.findOne({
      cache: 1000,
      where: { id: comment.noteId },
    });
  }
}
