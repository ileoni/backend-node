const { checkSchema } = require("express-validator");
const User = require("../../app/models/user")

const store = checkSchema({
    name: {
        isString: true,
        notEmpty: {
            errorMessage: "campo nome é obrigatório"
        }
    },
    lastname: {
        isString: true,
        notEmpty: false,
    },
    email: {
        notEmpty: {
            errorMessage: "campo email é obrigatório"
        },
        custom: {
            options: async (value) => {
                const {count} = await User.findAndCountAll({ where: { email: value }});
                if(!!count) throw new Error("Desculpe. Email já está em uso.");
            }
        }
    },
    password: {
        isString: true,
        notEmpty: {
            errorMessage: "campo senha é obrigatório"
        },
        isLength: {
            options: {
                min: 8
            },
            errorMessage: "Desculpe. A senha deve ter no mínimo 8 caracteres."
        }
    },
    confirmPassword: {
        isString: true,
        notEmpty: {
            errorMessage: "campo confirmar senha é obrigatório"
        },
        custom: {
            options: (confirmPassword, { req }) => confirmPassword === req.body.password,
            errorMessage: "Desculpe. As senhas não coincidem tente novamente."
        }
    }
})

module.exports = store;