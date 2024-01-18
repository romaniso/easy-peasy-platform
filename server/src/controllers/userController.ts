import {Request, Response} from "express";
import {User} from "../models/User";

export class UserController {
    async getUser(req: Request, res: Response) {
        try {
            const {username} = req.params;
            const user = User.findOne({username});
            return res.status(200).json(user);
        } catch (err) {
            console.error(err);
        }
    }
    async getAllUsers(req: Request, res: Response){
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            console.error(err);
        }
    }
    async createNewUser(req: Request, res: Response) {
        console.log('Add a new user');
        // const newEmployee = {
        //     firstname: req.body.firstname,
        //     lastname: req.body.lastname
        // }
        //
        // if (!newEmployee.firstname || !newEmployee.lastname) {
        //     return res.status(400).json({ 'message': 'First and last names are required.' });
        // }
        res.status(201);
    }
    async deleteUser(req: Request, res: Response) {
        console.log('Delete a user');
        // const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
        // if (!employee) {
        //     return res.status(400).json({ "message": `Employee ID ${req.body.id} not found` });
        // }
        // const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
        // data.setEmployees([...filteredArray]);
        // res.json(data.employees);
    }
    async updateUser(req: Request, res: Response) {
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