'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Token extends Model {
    static boot () {
      super.boot()
  
      this.addHook("beforeCreate", "ModelUuidHook.uuid");
    }
    
    static get primaryKey() {
      return "id";
    }
  
    static get incrementing() {
      return false;
    }
}

module.exports = Token
