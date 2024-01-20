import {Request, Response} from "express";
import {User} from "../models/User";
export class LogoutController {
    async logout(req: Request, res: Response){
        // On client, also delete the accessToken
        try {
            const cookies: {jwt: string} = req.cookies;
            if(!cookies?.jwt) return res.sendStatus(204); //No content but successful
            const refreshToken: string = cookies.jwt;

            // Is refreshToken in db?
            const foundUser = await User.findOne({refreshToken});
            if(!foundUser) {
                res.clearCookie('jwt', {
                    httpOnly: true,
                    secure: true,
                    maxAge: 24 * 60 * 60 * 1000
                });
                return res.sendStatus(204); //No content but successful
            }
            // Update the user document to remove refreshToken
            // or await User.updateOne({ _id: foundUser._id }, { $set: { refreshToken: "" } });
            await User.updateOne({ _id: foundUser._id }, { $unset: { refreshToken: 1 } });
            //@TODO: in production I need to add secure: true for https
            res.clearCookie('jwt', {
                httpOnly: true,
                secure: true,
                maxAge: 24 * 60 * 60 * 1000
            });
            res.sendStatus(204);

        } catch (err) {
            console.error(err);
            res.status(500).json({message: 'Server error'})
        }
    }
}