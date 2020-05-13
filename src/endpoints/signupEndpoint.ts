import {Request, Response} from 'express';
import { BaseDatabase } from '../data/BaseDatabase';
import { IdGenerator } from '../services/IdGenerator';
import { HashManager } from '../services/HashManager';
import { UserDatabase } from '../data/UserDatabase';
import { Authenticator } from '../services/Authenticator';


export const signupEndpoint = async(req: Request, res: Response) => {
    try{

        if(!req.body.name || !req.body.email || !req.body.password){
            throw new Error("Invalid name, email or password")
        }

        if(req.body.password.length < 6){
            throw new Error("Password must have 6 or more caracters")
        }

        const userData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        const idGenerator = new IdGenerator();
        const id = idGenerator.generateId();

        const hashManager = new HashManager();
        const hashPassword = await hashManager.hash(userData.password);

        const userDatabase = new UserDatabase();
        await userDatabase.createUser(
            id,
            userData.name,
            userData.email,
            hashPassword
        );

        const authenticator = new Authenticator()
        const token = authenticator.generateToken({
            id
        })

        res.status(200).send({
            access_token: token
        })

    }catch(err){
        res.status(400).send({
            message: err.message
        })

    }finally{
        await BaseDatabase.destroyConnection();
    }
}