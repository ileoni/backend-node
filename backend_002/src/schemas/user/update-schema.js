const { checkSchema, isLength } = require("express-validator");

const update = checkSchema({
    name: {
        isLength: {
            options: {
                min: 3
            },
            errorMessage: "Desculpe. Nome deve ter no mínimo 3 caracteres."
        }
    },
    lastname: {
        notEmpty: false
    }
})

module.exports = update;