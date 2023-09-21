// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import type { FromSchema } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'
import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import { userSchema } from '../users/users.schema'

export const postsSchema = Type.Object({
  id: Type.Integer(),
  title: Type.String(),
  content: Type.String(),
  created_at: Type.String({format: 'date-time'}),
  updated_at: Type.String({format: 'date-time'}),
  description: Type.String(),
  author: Type.Ref(userSchema)
},
{$id: 'Posts', additionalProperties: true})

/* export const postsSchema = {
  $id: 'Posts',
  type: 'object',
  additionalProperties: true,
  required: ['id', 'title', 'content'],
  properties: {
    id: { type: 'number' },
    title: { type: 'string' },
    content: { type: 'string' },
    created_at: { type: 'string', format: 'date-time' },
    updated_at: { type: 'string', format: 'date-time' },
    description: { type: 'string' },
    author: { $ref: 'User',}
  }
} as const */
export type Posts = Static<typeof postsSchema>
export const postsValidator = getValidator(postsSchema, dataValidator)
export const postsResolver = resolve<Posts, HookContext>({})

export const postsExternalResolver = resolve<Posts, HookContext>({})

export const postsDataSchema = Type.Pick(postsSchema, ['title', 'content', 'description'], {
  $id: 'PostsData'
})
// Schema for creating new data
/* export const postsDataSchema = {
  $id: 'PostsData',
  type: 'object',
  additionalProperties: false,
  required: ['title', 'content', 'description'],
  properties: {
    ...postsSchema.properties
  }
} as const */
export type PostsData = Static<typeof postsDataSchema>
export const postsDataValidator = getValidator(postsDataSchema, dataValidator)
export const postsDataResolver = resolve<PostsData, HookContext>({})

export const postsPatchSchema = Type.Partial(postsSchema, {
  $id: 'PostsPatch'
})

// Schema for updating existing data
/* export const postsPatchSchema = {
  $id: 'PostsPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...postsSchema.properties
  }
} as const */
export type PostsPatch = Static<typeof postsPatchSchema>
export const postsPatchValidator = getValidator(postsPatchSchema, dataValidator)
export const postsPatchResolver = resolve<PostsPatch, HookContext>({})

export const postsQueryProperties = Type.Pick(postsSchema, ['id', 'title', 'content', 'description', 'created_at', 'updated_at'])
export const postsQuerySchema = Type.Intersect(
  [
    querySyntax(postsQueryProperties),
    Type.Object({}, { additionalProperties: false})
  ],
  { additionalProperties: false}
)

// Schema for allowed query properties
/* export const postsQuerySchema = {
  $id: 'PostsQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(postsSchema.properties)
  }
} as const */
export type PostsQuery = Static<typeof postsQuerySchema>
// export const postsQueryValidator = getValidator(postsQuerySchema, queryValidator)
export const postsQueryResolver = resolve<PostsQuery, HookContext>({})
