'use strict'
const { v4: uuidv4 } = require('uuid');

const ModelUuidHook = exports = module.exports = {}

ModelUuidHook.uuid = async (modelInstance) => {
    if (modelInstance.id == null) {
        modelInstance.id = uuidv4()
    }
}

// ModelUuidHook.getUuid = async (modelInstance) => {
//     console.log(modelInstance)
// }
