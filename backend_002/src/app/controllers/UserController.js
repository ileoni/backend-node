const User = require("../models/user");

module.exports = {
    index: async (request, response) => {
        const users = await User.findAll()
        response.status(200).json(users);
    },
    store: async (request, response) => {
        try {
            const user = await new User(request.body).save();
            response.status(201).json({ success: true, user: user.id })
        } catch (err) {
            response.status(500).json({ success: false, error: err })
        }
    },
    update: async (request, response) => {
        try {
            const { body, params } = request;
            await User.update(body, { where: { id: params.id } })
            response.json({ success: true, user: params.id })
        } catch (err) {
            response.status(500).json({ success: false, error: err });
        }
    },
    delete: async (request, response) => {
        try {
            const { id } = request.params;
            await User.destroy({ where: { id: id } })
            response.json({ success: true, user: id });
        } catch (err) {
            response.status(500).json({ success: false, error: err });
        }
    }
}