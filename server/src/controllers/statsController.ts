import {Request, Response} from "express";
import {User} from "../models/User";

export class StatsController {
    async getAllStats(req: Request, res: Response){
        const username = req.params.username;
        console.log(username);
        try {
            const foundUser = await User.findOne({username});
            if(!foundUser){
                return res.sendStatus(401).json({message: 'User with this username was not found.'})
            }

            console.log(foundUser);

            res.status(200).json({stats: "Here you stats object"});

        } catch (err) {
            res.status(400).json({message: "Bad request."})
        }
    }
}