import { Request, Response } from 'express';
import { BaseDatabase } from '../data/BaseDatabase';
import { Authenticator } from '../services/Authenticator';
import { RecipeDatabase } from '../data/RecipeDatabase';

export const deleteRecipeEndpoint = async (req: Request, res: Response) => {
    try{
        const token = req.headers.authorization as string;

        const authenticator = new Authenticator();
        const tokenData = authenticator.verify(token);

        const recipeData = new RecipeDatabase();
        const recipeId = await recipeData.getById(req.params.id)        

        if(tokenData.id !== recipeId.user_id && tokenData.role !== "admin"){
            throw new Error("You Shall Not Pass")
        }

        await recipeData.delete(req.params.id)
        
        res.sendStatus(200)

    }catch(err){
        res.status(400).send({
            message: err.message
        })
    }finally{
        BaseDatabase.destroyConnection();
    }

}