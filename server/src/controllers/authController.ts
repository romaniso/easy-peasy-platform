import {Request, Response} from "express";
import {User} from "../models/User";
import bcrypt from 'bcrypt';
import {generateAccessToken} from "../utils/generateAccessToken";

export class AuthController {
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
                const accessToken = generateAccessToken(foundUser.username, foundUser.roles);
                const refreshToken = generateAccessToken(foundUser.username, foundUser.roles, true);
                //save refreshToken to DB for this user
                await User.updateOne({ _id: foundUser._id }, { $set: { refreshToken } });
                //httpOnly prevents saving it in JS
                //@TODO: in production I need to add secure: true for https
                res.cookie('jwt', refreshToken, {
                    httpOnly: true,
                    sameSite: 'none',
                    secure: true,
                    maxAge: 24 * 60 * 60 * 1000
                }) //one day

                const user = {
                    avatar: foundUser.avatar,
                    firstName: foundUser.firstName,
                    lastName: foundUser.lastName,
                    email: foundUser.email,
                    birthday: foundUser.birthday,
                    likes: foundUser.likes,
                    motivations: foundUser.motivations,
                }

                //@TODO: send user object for user context (non-sensitive data)
                res.json({accessToken, roles: foundUser.roles, user});
            }
        } catch (err) {
            console.error(err);
            res.status(401).json({message: 'Login error'})
        }
    }
}