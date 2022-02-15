'use strict'

const { v4: uuidv4 } = require('uuid');
const Customer = use('App/Models/Customer')

/*
|--------------------------------------------------------------------------
| CustomerSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class CustomerSeeder {
  async run () {
    const customer = new Customer()
    customer.id = 'ea0212d3-abd6-406f-8c67-868e814a2436'
    customer.name = 'Juniardy'
    customer.username = 'juuns99@gmail.com'
    customer.password = uuidv4('password')
    
    await customer.save()
  }
}

module.exports = CustomerSeeder
