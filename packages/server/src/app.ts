import { ApolloServer } from 'apollo-server-express';
import database from '@approval/server/database';
import schemaLoader from '@approval/server/schemaLoader';
import logger from '@approval/server/common/logger';
import { Context, User } from '@approval/server/common/types';
import config from '@approval/server/config';
import base64parse from '@approval/server/common/baseAuthDecode';
import express from 'express';
import { createServer, Server } from 'http';

class App {
  public httpServerUrl: string;
  public wsServerUrl: string;
  private path: string;

  constructor() {
    this.path = '/graphql';
    this.httpServerUrl = '';
    this.wsServerUrl = '';
  }

  public async initAll(): Promise<Server> {
    await this.initDatabase();
    return await this.initServer();
  }

  private async initDatabase(): Promise<void> {
    logger.info('init database');
    await database(config.database);
  }

  private async initServer(): Promise<Server> {
    logger.info('init server2');

    const app = express();

    const apolloServer = new ApolloServer({
      schema: await schemaLoader(),
      context: (integration) => {
        if (integration.connection) {
          // check connection for metadata
          return integration.connection.context;
        } else {
          const credentials = base64parse(integration.req.headers.authorization);
          const user: User = {
            name: '',
            login: '',
          };

          if (credentials) {
            user.name = credentials.username || '';
            user.login = credentials.username || '';
          }

          const ctx: Context = {
            user,
          };

          return ctx;
        }
      },
      subscriptions: {
        path: '/subscriptions',
        onConnect: (connectionParams: Record<string, any>) => {
          if (!connectionParams.Authorization) throw new Error('Send authentication connectionParams!');
          const credentials = base64parse(connectionParams.Authorization);
          const user: User = {
            name: '',
            login: '',
          };

          if (credentials) {
            user.name = credentials.username || '';
            user.login = credentials.username || '';
          }

          return user;
        },
      },
      tracing: true,
      cacheControl: true,
      engine: {
        apiKey: '/graphql',
      },
    });

    apolloServer.applyMiddleware({ app, path: this.path });

    const server = await createServer(app);

    apolloServer.installSubscriptionHandlers(server);

    this.httpServerUrl = apolloServer.graphqlPath;
    this.wsServerUrl = apolloServer.subscriptionsPath || '';

    return server;
  }
}

export default App;
