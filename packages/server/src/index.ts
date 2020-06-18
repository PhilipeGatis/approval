import config from '@approval/server/config'
import App from '@approval/server/app'
import logger from '@approval/server/common/logger'

const initApp = async () => {
  const app = new App()

  const server = await app.initAll()

  server.listen(config.port, () => {
    logger.info(`🚀 Server ready at http://localhost:${config.port}${app.httpServerUrl}`)
    if (app.wsServerUrl) logger.info(`🚀 Subscriptions ready at ws://localhost:${config.port}${app.wsServerUrl}`)
  })
}

initApp()
