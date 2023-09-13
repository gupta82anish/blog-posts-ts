// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import type { FromSchema } from '@feathersjs/schema'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
/* export const postsSchema = {
  $id: 'Posts',
  type: 'object',
  additionalProperties: false,
  required: ['id', 'text'],
  properties: {
    id: { type: 'number' },

    text: { type: 'string' }
  }
} as const */

export const postsSchema = {
  $id: 'Posts',
  type: 'object',
  additionalProperties: true,
  required: ['id', 'title', 'content', 'published'],
  properties: {
    id: { type: 'number' },
    title: { type: 'string' },
    content: { type: 'string' },
    created_at: { type: 'string', format: 'date-time' },
    updated_at: { type: 'string', format: 'date-time' },
    description: { type: 'string' },
  }
} as const
export type Posts = FromSchema<typeof postsSchema>
export const postsValidator = getValidator(postsSchema, dataValidator)
export const postsResolver = resolve<Posts, HookContext>({})

export const postsExternalResolver = resolve<Posts, HookContext>({})

// Schema for creating new data
export const postsDataSchema = {
  $id: 'PostsData',
  type: 'object',
  additionalProperties: false,
  required: ['title', 'content', 'description'],
  properties: {
    ...postsSchema.properties
  }
} as const
export type PostsData = FromSchema<typeof postsDataSchema>
export const postsDataValidator = getValidator(postsDataSchema, dataValidator)
export const postsDataResolver = resolve<PostsData, HookContext>({})

// Schema for updating existing data
export const postsPatchSchema = {
  $id: 'PostsPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...postsSchema.properties
  }
} as const
export type PostsPatch = FromSchema<typeof postsPatchSchema>
export const postsPatchValidator = getValidator(postsPatchSchema, dataValidator)
export const postsPatchResolver = resolve<PostsPatch, HookContext>({})

// Schema for allowed query properties
export const postsQuerySchema = {
  $id: 'PostsQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(postsSchema.properties)
  }
} as const
export type PostsQuery = FromSchema<typeof postsQuerySchema>
export const postsQueryValidator = getValidator(postsQuerySchema, queryValidator)
export const postsQueryResolver = resolve<PostsQuery, HookContext>({})
