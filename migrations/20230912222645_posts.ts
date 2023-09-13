// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('posts', (table) => {
    table.increments('id')

    table.string('title')
    table.string('content')
    table.string('description')
    table.string('author')
    table.timestamps(true, true)

  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('posts')
}
