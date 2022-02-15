'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Customer extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to hash the customer password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (customerInstance) => {
      if (customerInstance.dirty.password) {
        customerInstance.password = await Hash.make(customerInstance.password)
      }
    })

    this.addHook("beforeCreate", "ModelUuidHook.uuid");
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }
    
  static get primaryKey() {
    return "id";
  }

  static get incrementing() {
    return false;
  }
}

module.exports = Customer
