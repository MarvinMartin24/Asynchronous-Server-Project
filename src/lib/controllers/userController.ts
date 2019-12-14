import mongoose from 'mongoose';
import { UserSchema } from '../models/userModel';
import { Request, Response } from 'express';

const User = mongoose.model('User', UserSchema);

export class UserController{

    public addUser (req: Request, res: Response) {
        let newUser = new User(req.body);

        newUser.save((err, user) => {
            if(err){
                res.send(err);
            }
            res.json(user);
        });
    }

    public getUsers (req: Request, res: Response) {
        User.find({}, (err, user) => {
            if(err){
                res.send(err);
            }
            res.json(user);
        });
    }

    public getUserWithEmail (req: Request, res: Response) {
        User.find({email: req.params.email}, (err, user) => {
            if(err){
                res.send(err);
            }
            res.json(user);
        });
    }
}
