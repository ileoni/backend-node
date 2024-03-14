const store = require("../../schemas/user/store-schema");
const update = require("../../schemas/user/update-schema");
const { validationResult } = require("express-validator");

module.exports = {
    store,
    update,
    storeValidator(request, response, next)
    {
        const schema = validationResult(request);
        if(!schema.isEmpty()) {
            return response.status(400).json(schema)
        }

        next();
    },
    updateValidator(request, response, next)
    {
        const schema = validationResult(request);
        if(!schema.isEmpty()) {
            return response.status(400).json(schema)
        }
        
        next();
    }
}