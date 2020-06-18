import { AuthChecker } from 'type-graphql'
import { Context } from '@approval/server/common/types'

export const authChecker: AuthChecker<Context> = ({ context: { user } }, roles) => {
  if (user) {
    // and if no user, restrict access
    return true
  }
  return false
}
