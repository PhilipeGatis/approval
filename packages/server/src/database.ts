import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { Approval } from '@approval/server/entities/approval'
import { Approver } from '@approval/server/entities/approver'
import { Note } from '@approval/server/entities/note'
import { Comment } from '@approval/server/entities/comment'
import { Asset } from '@approval/server/entities/asset'
import { DatabaseConfig } from '@approval/server/./config'
import logger from '@approval/server/common/logger'

const create = async (config: DatabaseConfig) => {
  logger.info(`try to connect to ${config.type}: ${config.host}:${config.port}`)
  try {
    const connection = await createConnection({
      type: config.type,
      host: config.host,
      port: config.port,
      username: config.username,
      password: config.password,
      database: config.database,
      entities: [
        Approval,
        Approver,
        Note,
        Comment,
        Asset
      ],
      synchronize: true,
      logging: true
    })
    logger.info(`Database initied with success ${connection.name}`)
  } catch (error) {
    logger.error(error)
    throw error
  }
}

export default async (config: DatabaseConfig): Promise<void> => await create(config)
