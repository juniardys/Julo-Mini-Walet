'use strict'

const { v4: uuidv4 } = require('uuid');

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/Customer', (faker) => {
  return {
    name: faker.name.findName(),
    username: faker.username(),
    password: uuidv4('password')
  }
})
