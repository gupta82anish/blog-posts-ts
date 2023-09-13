// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexAdapter, KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Posts, PostsData, PostsPatch, PostsQuery } from './posts.schema'
import { Id, NullableId, Paginated } from '@feathersjs/feathers'
export type { Posts, PostsData, PostsPatch, PostsQuery }

export interface PostsParams extends KnexAdapterParams<PostsQuery> {
}


// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class PostsService<ServiceParams extends Params = PostsParams> extends KnexService<
  Posts,
  PostsData,
  PostsParams,
  PostsPatch
> {
    async find(
      params: PostsParams & { paginate?: { default?: number; max?: number } }
    ): Promise<Paginated<Posts>>
    async find(params: ServiceParams & { paginate: false }): Promise<Posts[]>
    // async find(params: ServiceParams): Promise<Paginated<Posts> | Posts[]>
    async find(params: ServiceParams): Promise<Paginated<Posts> | Posts[]>{
      params.query = {
        ...params?.query,
        $select: ['id', 'title', 'author', 'created_at', 'updated_at', 'description'],
        $sort: { updated_at: -1 },
      }
      return super.find(params)
    }
}

/* export class PostsService<ServiceParams extends Params = PostsParams> extends KnexAdapter<
  Posts,
  PostsData,
  PostsParams,
  PostsPatch>{
    async find(params: ServiceParams){
      params.query = {
        ...params?.query,
        $select: ['id', 'title', 'author', 'created_at', 'updated_at', 'description'],
        $sort: { updated_at: -1 },
      }
      return super._find(params)
    }
  } */

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'posts'
  }
}
