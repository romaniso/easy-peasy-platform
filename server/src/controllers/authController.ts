import {Request, Response} from "express";
import {User} from "../models/User";
import {Role} from "../models/Role";
import {RoleName} from "../enums/role";
import bcrypt from 'bcrypt';
import {validationResult} from "express-validator";
import {generateAccessToken} from "../utils/generateAccessToken";
import * as console from "console";

export class authController {
    async registration(req: Request, res: Response) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({message: 'Registration error: ', errors});
            }
            const {username, password} = req.body;
            // Check for duplicate in the db
            const duplicate = await User.findOne({username});
            if (duplicate){
                // Conflict
                return res.sendStatus(409).json({message: 'This user name already exists. Please, insert something different.'})
            } else {
                // Register a new user
                // encrypt the password
                const hashedPassword = await bcrypt.hash(password, 10);
                const userRole = await Role.findOne({value: RoleName.User});
                const newUser = new User({username, password: hashedPassword, roles: [userRole?.value]})
                await newUser.save();
                return res.status(201).json({message: `New user ${username} has been successfully signed in.`});
            }
        } catch (err) {
            console.error(err);
            res.status(400).json({message: 'Registration error'})
        }
    }
    async login(req: Request, res: Response){
        try {
            const {username, password} = req.body;
            const foundUser = await User.findOne({username});
            if(!foundUser){
                return res.sendStatus(401).json({message: 'User with this username was not found. Try with a different user name.'})
            }
            // evaluate password
            const match = bcrypt.compareSync(password, foundUser.password);
            if(!match){
                return res.status(401).json({message: 'Invalid password.'});
            } else {
                // create JWT and refresh token
                const accessToken = generateAccessToken(foundUser._id, foundUser.roles);
                const refreshToken = generateAccessToken(foundUser._id, foundUser.roles, true);
                //save refreshToken to DB for this user
                await User.updateOne({ _id: foundUser._id }, { $set: { refreshToken } });
                //httpOnly prevents saving it in JS
                res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000}) //one day
                // res.json({accessToken, roles: foundUser.roles});
                res.json({accessToken});
            }
        } catch (err) {
            console.error(err);
            res.status(401).json({message: 'Login error'})
        }
    }
    // async getUserByUsername(req: Request, res: Response) {
    //     try {
    //         const {username} = req.params;
    //         const user = User.findOne({username});
    //         return res.status(200).json(user);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }
    async getUsers(req: Request, res: Response){
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            console.error(err);
        }
    }
    async editUser(req: Request, res: Response) {
        try {
            const {username} = req.body;
            const user = await User.findOne({username});
            if(!user) {
                return res.status(400).json({message: `Username ${username} was not found`})
            }
            // Edition logic
            return res.status(200).json(user);
        } catch (err) {
            console.error(err);
        }
    }
}