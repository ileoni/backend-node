import { Request, Response } from 'express';
import User, { UserAttributes } from '../models/User';

class UserController
{
    async index(request: Request, response: Response)
    {
        const users = await User.findAll();
        response.json({ success: true, users });
    }
    
    async store(request: Request, response: Response)
    {
        try {
            const user: UserAttributes = await new User(request.body).save();
            response.status(200).json({ success: true, user: user.id });
        } catch (err) {
            response.status(500).json({ success: false, error: err });
        }
    }

    async update(request: Request, response: Response)
    {
        try {
            const { body, params } = request;
            await User.update(body, { where: { id: params.id } });
            response.status(200).json({ success: true, user: params.id });
        } catch (err) {
            response.status(500).json({ success: false, error: err });
        }
    }

    async delete(request: Request, response: Response)
    {
        try {
            const { id } = request.params;
            await User.destroy({ where: { id: id } });
            response.status(200).json({ success: true, user: id });
        } catch (err) {
            response.status(500).json({ success: false, error: err });
        }
    }
}

export default UserController;