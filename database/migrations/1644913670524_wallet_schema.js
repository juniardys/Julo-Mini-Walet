'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class WalletSchema extends Schema {
  up () {
    this.create('wallets', (table) => {
      table.uuid("id").primary()
      table.uuid('owned_by').references('id').inTable('customers')
      table.string('status').notNullable().defaultTo('enabled')
      table.timestamp('enabled_at').defaultTo(this.fn.now())
      table.timestamp('disabled_at').nullable()
      table.decimal('balance').notNullable().defaultTo(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('wallets')
  }
}

module.exports = WalletSchema
