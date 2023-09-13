// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'
import { type HookContext } from '@feathersjs/feathers'
import {
  postsDataValidator,
  postsPatchValidator,
  postsQueryValidator,
  postsResolver,
  postsExternalResolver,
  postsDataResolver,
  postsPatchResolver,
  postsQueryResolver
} from './posts.schema'

import type { Application } from '../../declarations'
import { PostsService, getOptions } from './posts.class'
import { async } from 'rxjs'

export const postsPath = 'posts'
export const postsMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export * from './posts.class'
export * from './posts.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const posts = (app: Application): void => {
  // Register our service on the Feathers application
  app.use(postsPath, new PostsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: postsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(postsPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(postsExternalResolver), schemaHooks.resolveResult(postsResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(postsQueryValidator), schemaHooks.resolveQuery(postsQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(postsDataValidator), schemaHooks.resolveData(postsDataResolver),
      async (context: HookContext) => {
        const currentTime = new Date()
        Object.assign(context.data, { created_at: currentTime, updated_at: currentTime })
        return context
      }],
      patch: [schemaHooks.validateData(postsPatchValidator), schemaHooks.resolveData(postsPatchResolver),
      async (context: HookContext) => {
        const currentTime = new Date()
        Object.assign(context.data, { updated_at: currentTime });
        return context
      }],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [postsPath]: PostsService
  }
}
