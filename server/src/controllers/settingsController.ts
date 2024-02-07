import {Request, Response} from "express";
import {User} from "../models/User";
import bcrypt from 'bcrypt';

export class SettingsController {
    async changePwd(req: Request, res: Response){
        try {
            const {username, password, newPassword} = req.body;
            const foundUser = await User.findOne({username});
            if(!foundUser){
                return res.sendStatus(401).json({message: 'User with this username was not found. Try with a different user name.'})
            }
            // evaluate password
            const match = bcrypt.compareSync(password, foundUser.password);
            if(!match){
                return res.status(401).json({message: 'Invalid password.'});
            } else {
                const prevPassMatch = bcrypt.compareSync(newPassword, foundUser.password);
                if(prevPassMatch) {
                    return res.status(401).json({message: 'New password must be different than previous password.'});
                }
                // create JWT and refresh token
                const hashedNewPassword = await bcrypt.hash(newPassword, 10);
                await User.updateOne({ _id: foundUser._id }, { $set: { password: hashedNewPassword } });
                //@TODO: in production I need to add secure: true for https
                res.status(201).json({message: 'Password has been changed'})
            }
        } catch (err) {
            console.error(err);
            res.status(401).json({message: 'Invalid password'})
        }
    }
}