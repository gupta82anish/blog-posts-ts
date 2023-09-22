// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve /* getValidator */ /* querySyntax */ } from '@feathersjs/schema'
import { passwordHash } from '@feathersjs/authentication-local'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'
import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema

export const userSchema = Type.Object({
  id: Type.Integer(),
  name: Type.String(),
  email: Type.String(),
  password: Type.String()
},
{ $id: 'User', additionalProperties: false })

/* export const userSchema = {
  $id: 'User',
  type: 'object',
  additionalProperties: false,
  required: ['id', 'email', 'password'],
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' }
  }
} as const */
export type User = Static<typeof userSchema>
export const userValidator = getValidator(userSchema, dataValidator)
export const userResolver = resolve<User, HookContext>({})

export const userExternalResolver = resolve<User, HookContext>({
  // The password should never be visible externally
  password: async () => undefined
})

export const userDataSchema = Type.Pick(userSchema, ['name', 'email', 'password'], {
  $id: 'UserData'
})

// Schema for creating new data
/* export const userDataSchema = {
  $id: 'UserData',
  type: 'object',
  additionalProperties: false,
  required: ['email', 'name', 'password'],
  properties: {
    ...userSchema.properties
  }
} as const */
export type UserData = Static<typeof userDataSchema>
export const userDataValidator = getValidator(userDataSchema, dataValidator)
export const userDataResolver = resolve<User, HookContext>({
  password: passwordHash({ strategy: 'local' }),
  email: async (value) => value?.toLowerCase()
})

export const userPatchSchema = Type.Partial(userSchema, {
  $id: 'UserPatch'
})

// Schema for updating existing data
/* export const userPatchSchema = {
  $id: 'UserPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...userSchema.properties
  }
} as const */
export type UserPatch = Static<typeof userPatchSchema>
export const userPatchValidator = getValidator(userPatchSchema, dataValidator)
export const userPatchResolver = resolve<User, HookContext>({
  password: passwordHash({ strategy: 'local' })
})

export const userQueryProperties = Type.Pick(userSchema, ['id', 'name', 'email'])
export const userQuerySchema = Type.Intersect(
  [
    querySyntax(userQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)

// Schema for allowed query properties
/* export const userQuerySchema = {
  $id: 'UserQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(userSchema.properties)
  }
} as const */
export type UserQuery = Static<typeof userQuerySchema>
export const userQueryValidator = getValidator(userQuerySchema, queryValidator)
export const userQueryResolver = resolve<UserQuery, HookContext>({
  // If there is a user (e.g. with authentication), they are only allowed to see their own data
  id: async (value, user, context) => {
    if (context.params.user !== null && context.params.user !== undefined) {
      return context.params.user.id
    }

    return value
  }
})
