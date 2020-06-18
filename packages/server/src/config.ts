import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

// Types
type LogConfig = {
  level: string
};

export type DatabaseConfig = {
  type: 'mysql',
  host: string,
  port: number,
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

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'
const { NODE_ENV } = process.env

const envPath =
    NODE_ENV === 'dev'
      ? path.resolve(__dirname, '/../.env.dev')
      : path.resolve(__dirname, '/../.env')

const envFileExists = fs.existsSync(envPath)

if (envFileExists && ['dev', 'test'].includes(NODE_ENV)) {
  const result = dotenv.config({
    path: envPath
  })

  if (result.error) {
    throw result.error
  }
}

const {
  LOG_LEVEL = 'info',
  PORT = 3001
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
    host: '127.0.0.1',
    port: 3306,
    username: 'test',
    password: 'test',
    database: 'test'
  }
}

export default appConfig
