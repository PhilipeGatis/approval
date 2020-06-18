import { Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Field, ID, ObjectType } from 'type-graphql'

@Entity()
@ObjectType()
export class Base {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;
}
