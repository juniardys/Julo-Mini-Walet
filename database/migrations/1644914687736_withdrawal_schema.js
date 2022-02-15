'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class WithdrawalSchema extends Schema {
  up () {
    this.create('withdrawals', (table) => {
      table.uuid("id").primary()
      table.uuid('wallet_id').references('id').inTable('wallets')
      table.uuid('withdrawn_by').references('id').inTable('customers')
      table.string('status').notNullable().defaultTo('success')
      table.timestamp('withdrawn_at').defaultTo(this.fn.now())
      table.decimal('amount').notNullable().defaultTo(0)
      table.uuid('reference_id').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('withdrawals')
  }
}

module.exports = WithdrawalSchema
