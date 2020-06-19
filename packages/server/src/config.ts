import dotenvSafe from 'dotenv-safe'
import path from 'path'

// Types
type LogConfig = {
  level: string
};

export type DatabaseConfig = {
  type: 'mysql',
  host: string,
  port: number | string,
  username: string,
  password: string,
  database: string
};

type AppConfig = {
  env: any;
  port: number;
  logs: LogConfig;
  database: DatabaseConfig;
}

const cwd = process.cwd();

const root = path.join.bind(cwd);
const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV === 'dev') {
  dotenvSafe.config({
    path: root('.env.dev'),
    sample: root('.env.sample')
  });
}

if (NODE_ENV === 'test') {
  dotenvSafe.config({
    path: root('.env.test'),
    sample: root('.env.sample')
  });
}

if (NODE_ENV === 'prod') {
  dotenvSafe.config({
    path: root('.env'),
    sample: root('.env.sample')
  });
}

const {
  LOG_LEVEL = 'info',
  PORT = 3001,
  DB_HOST = '127.0.0.1',
  DB_PORT = 3306,
  DB_USER = 'test',
  DB_PASS = 'test',
  DB_DATABASE = 'test'
} = process.env

const appConfig: AppConfig = {
  env: NODE_ENV,
  /**
     * Your favorite port
     */
  //   port: parseInt(PORT as string, 10),
  port: Number(PORT),

  /**
     * Used by winston logger
     */
  logs: {
    level: LOG_LEVEL
  },

  /**
   * Database configs
   */
  database: {
    type: 'mysql',
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASS,
    database: DB_DATABASE
  }
}

export default appConfig
