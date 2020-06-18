import {
  Resolver,
  Query,
  Arg,
  FieldResolver,
  Root,
  Mutation,
  InputType,
  Field,
  Ctx,
  PubSub
} from 'type-graphql'
import { Approval } from '@approval/server/entities/approval'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Repository } from 'typeorm'
import { Note } from '@approval/server/entities/note'
import { Comment } from '@approval/server/entities/comment'
import { GraphQLJSONObject } from 'graphql-type-json'
import { Context } from '@approval/server/common/types'
import { PubSubEngine } from 'graphql-subscriptions'
import {Approver} from "@approval/server/entities/approver";

@InputType()
class NoteInput implements Partial<Note> {
  @Field(type => GraphQLJSONObject)
  markup!: typeof GraphQLJSONObject;

  @Field()
  text!: string;

  @Field()
  approvalId!: string;
}

@Resolver(Note)
export class NoteResolver {
  constructor (
    @InjectRepository(Note) private readonly noteRepository: Repository<Note>,
    @InjectRepository(Comment) private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Approval) private readonly approvalRepository: Repository<Approval>
  ) {}

  @Query(returns => Note, { nullable: true })
  note (@Arg('noteId', type => String) noteId: string) {
    return this.noteRepository.findOne(noteId)
  }

  @Query(returns => [Note])
  notes (
    @Arg('approvalId', type => String) approvalId: string
  ): Promise<Note[]> {
    return this.noteRepository.find({ where: { approvalId: approvalId } })
  }

  @Mutation(returns => Note)
  async addNote (
    @PubSub() pubSub: PubSubEngine,
    @Arg('note') noteInput: NoteInput,
    @Ctx() { user }: Context
  ): Promise<Note> {
    const note = await this.noteRepository.create({ createdBy: user?.login, ...noteInput })
    const result = await this.noteRepository.save(note)
    await pubSub.publish('UPDATE_INFO', { approvalId: note.approvalId, id: note.approvalId, entityName: 'Note' })
    return result
  }

  @FieldResolver()
  approval (@Root() approver: Approver) {
    return this.approvalRepository.findOne({
      cache: 1000,
      where: { id: approver.approvalId }
    })
  }

  @FieldResolver()
  comments (@Root() note: Note) {
    return this.commentRepository.find({
      cache: 1000,
      where: { noteId: note.id }
    })
  }
}
