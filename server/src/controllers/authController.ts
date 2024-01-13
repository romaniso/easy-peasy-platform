import {Request, Response} from "express";
import {User} from "../models/User";
import {Role} from "../models/Role";
import {RoleName} from "../enums/role";
import bcrypt from 'bcrypt';
import {validationResult} from "express-validator";
import {generateAccessToken} from "../utils/generateAccessToken";

export class authController {
    async registration(req: Request, res: Response) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({message: 'Registration error: ', errors});
            }
            const {username, password} = req.body;
            const candidate = await User.findOne({username});
            if (candidate){
                return res.status(409).json({message: 'This user name already exists. Please, insert something different.'})
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
            const {username, password} = req.body;
            const user = await User.findOne({username});
            if(!user){
                return res.status(400).json({message: 'User with this username was not found. Try with a different user name.'})
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if(!validPassword){
                return res.status(400).json({message: 'Invalid password.'});
            }
            const token = generateAccessToken(user._id, user.roles);
            return res.json({token});
        } catch (err) {
            console.error(err);
            res.status(400).json({message: 'Login error'})
        }
    }
    async getUsers(req: Request, res: Response){
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            console.error(err);
        }
    }
}