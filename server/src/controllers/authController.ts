import {Request, Response} from "express";
import {User} from "../models/User";
import {Role} from "../models/Role";
import {RoleName} from "../enums/role";
import bcrypt from 'bcrypt';

export class authController {
    async registration(req: Request, res: Response) {
        try {
            const {username, password} = req.body;
            const candidate = await User.findOne({username});
            if (candidate){
                return res.status(400).json({message: 'This user name already exists. Please, insert something different.'})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: RoleName.User});
            const user = new User({username, password: hashPassword, roles: [userRole?.value]})
            await user.save();
            return res.json({message: 'User has been successfully signed in.'});
        } catch (err) {
            console.error(err);
            res.status(400).json({message: 'Registration error'})
        }
    }
    async login(req: Request, res: Response){
        try {

        } catch (err) {
            console.error(err);
            res.status(400).json({message: 'Login error'})
        }
    }
    async getUsers(req: Request, res: Response){
        try {
            res.json('Server working')
        } catch (err) {
            console.error(err);
        }
    }
}