import { BaseDatabase } from "./BaseDatabase";

export class RecipeDatabase extends BaseDatabase {
    private static TABLE_NAME: string = "CookenuRecipes";

    public async create(
        id:string,
        user_id:string,
        title:string,
        description:string,
        created_at:string    
    ): Promise<void> {
        await this.connection()
        .insert({
            id,
            user_id,
            title,
            description,
            created_at
        })
        .into(RecipeDatabase.TABLE_NAME)
    }

   public async getById(id: string):Promise<any>{
       const result = await this.connection()
       .select("*")
       .from(RecipeDatabase.TABLE_NAME)
       .where({id})

       return result[0]
   }
}