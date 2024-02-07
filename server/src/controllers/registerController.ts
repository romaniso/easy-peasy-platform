import {Request, Response} from "express";
import {User} from "../models/User";
import {Role} from "../models/Role";
import {RoleName} from "../enums/role";
import bcrypt from 'bcrypt';
import {validationResult} from "express-validator";

export class RegisterController {
    async registration(req: Request, res: Response) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({message: 'Registration error: ', errors});
            }
            const {username, password} = req.body;
            // Check for duplicate in the db
            const duplicate = await User.findOne({username}).exec();
            if (duplicate){
                // Conflict
                return res.status(409).json({message: 'This user name already exists. Please, insert something different.'})
            } else {
                // Register a new user
                // encrypt the password
                const hashedPassword = await bcrypt.hash(password, 10);
                // Create and Store a new user
                const userRole = await Role.findOne({value: RoleName.User});
                const newUser = new User({
                    username,
                    password: hashedPassword,
                    roles: [userRole?.value]
                })
                await newUser.save();
                return res.status(201).json({message: `New user ${username} has been successfully signed in.`});
            }
        } catch (err) {
            console.error(err);
            res.status(400).json({message: 'Registration error'})
        }
    }
}