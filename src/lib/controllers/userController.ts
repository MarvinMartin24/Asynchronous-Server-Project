import mongoose from 'mongoose';
import { Request, Response } from 'express';
const jwt = require('jsonwebtoken');
var User = require('../models/userModel');



export class UserController{

    public addUser(req: Request, res: Response) {
        let newUser = new User(req.body);
        User.create(newUser)
        .then((data) => {
            res.status(200).json(data);
        }).catch((err) => {
            res.status(400).json(err);
        });
    }

    public authenticate(req: Request, res: Response) {
        User.findOne({ email: req.body.email }).then((user) => {
            if (!user) {
                res.json('Not in the Database.');
            } else {
                user.comparePassword(req.body.password).then(() => {
                    const token = jwt.sign({ id: user._id }, req.app.get('secretKey'), { expiresIn: '1h' });
                    res.status(200).json({status:"success", message: "User found", data: {user: user, token:token}});
                }).catch((err) => {
                    if (!err) {
                        res.status(404).json({status:"error", message: "Invalid email/password", data:null});
                    } else {
                        res.status(404).json({status:"error", message: "Problem", data:null});
                    }
                });
            }
        }).catch((err) => {
            res.status(404).json({message: "Error"});
        })
    }

    public validateUser(req: Request, res: Response, next: any) {
        const token = req.headers['token'];
        if (!token) {
            return res.status(401).json({status:"error", message: "No token"});
        }

        jwt.verify(token, req.app.get('secretKey'), function(err, decoded){
            if (err) {
                res.status(401).json({status:"error", message: "Error"});
            } else {
                User.findById(decoded.id, function(err, user){
                    if (!user) {
                        return res.status(401).json({status:"error", message: "User not found"});
                    } else {
                        req.body.user = user;
                        next();
                    }
                });
            }
        });
    }

    public getAllUsers (req: Request, res: Response) {
        User.find({}, (err, user) => {
            if(err){
                res.send(err);
            }
            res.json(user);
        });
    }

    public getUserbyId (req: Request, res: Response) {
        User.findById(req.body.user._id, (err, user) => {
            if(err){
                res.send(err);
            }
            res.json(user);
        });
    }

    public updateUserById (req: Request, res: Response) {
        User.findOneAndUpdate({"_id": req.body.user._id}, req.body, (err, user) => {
            if (err) {
                return err;
            } else {
                user.password = req.body.password;
                user.save((err, doc) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.status(200).send({status:"success", message: "User updated"});
                    }
                })
            }
        });
    }

    public deleteUserById (req: Request, res: Response) {
        User.deleteOne({"_id" : req.body.user._id}, (err, user) => {
            if(err){
                res.send(err);
            }
            res.status(200).json({status:"success", message: "User deleted"});
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
