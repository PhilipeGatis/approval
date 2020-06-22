import 'reflect-metadata';
import {
  ApprovalResolver,
  NoteResolver,
  ApproverResolver,
  CommentResolver,
  UpdateInfoResolver,
} from '@approval/server/resolvers';
import { authChecker } from '@approval/server/common/authChecker';
import { buildSchema } from 'type-graphql';
import { GraphQLSchema } from 'graphql';
import { Container } from 'typedi';
import * as TypeORM from 'typeorm';

TypeORM.useContainer(Container);

const initSchemas = async (): Promise<GraphQLSchema> => {
  return await buildSchema({
    resolvers: [ApprovalResolver, NoteResolver, ApproverResolver, CommentResolver, UpdateInfoResolver],
    authChecker,
    container: Container,
  });
};

export default initSchemas;
