import {Request, Response} from "express";

export class authController {
    async registration(req: Request, res: Response) {
        try {

        } catch (err) {
            console.error(err);
        }
    }
    async login(req: Request, res: Response){
        try {

        } catch (err) {
            console.error(err);
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