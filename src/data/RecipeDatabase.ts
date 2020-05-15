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

  /* public async getFeed():Promise<any>{
       const result = await this.connection().raw(`
       SELECT * FROM ${RecipeDatabase.TABLE_NAME} r LEFT JOIN CookenuUser u ON r.user_id = u.id
       `)   

       return result.map((recipe: { id: any; name: any; }) =>{
           return{
            id: recipe.id,
            name: recipe.name
           }

       })
   }*/ 
   
   public async getFeed(): Promise<any> {
    const result = await this.connection()
    .select("*")
    .from(`${RecipeDatabase.TABLE_NAME}`)
    .leftJoin(`CookenuUser`, "CookenuRecipes.user_id", `CookenuUser.id`)
    return result.map(recipe=>{return{
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      createdAt: recipe.created_at,
      userId: recipe.user_id,
      userName: recipe.name
    }})
  }
} 