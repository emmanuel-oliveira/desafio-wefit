import { Request, Response } from 'express';
import { CustomError } from '../Resources/CustomError';
import { UserFactory } from '../models/user/factory';
import { User } from '../models/user/user';
import { createUserDB, listUsersDB } from '../database/userDatabase';

export async function createUser (req: Request, res: Response) {
    try{

        const user : User = UserFactory.createUser(req.body);
        await createUserDB(user)
        return res.status(201).json({"message": "Usuário criado com sucesso"});

    }catch (e){
        let response = e instanceof CustomError && res.status(e.statusCode).json({message: e.message})   
        return response;
    }


}



export async function listUsers (req: Request, res: Response) {
    try{

        const users: Array<User> = await listUsersDB()
        return res.status(200).json({"users": users});

    }catch (e){
        let response = e instanceof CustomError && res.status(e.statusCode).json({message: e.message})   
        return response;
    }


}