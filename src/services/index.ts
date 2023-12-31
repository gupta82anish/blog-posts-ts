import { user } from './users/users'
import { posts } from './posts/posts'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application): void => {
  app.configure(user)
  app.configure(posts)
  // All services will be registered here
}
