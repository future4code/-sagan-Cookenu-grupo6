import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase{

    private static TABLE_NAME:string = "CookenuUser";

    public async createUser(
        id:string,
        name:string,
        email:string,
        password:string
    ):Promise<void> {
        await this.connection()
        .insert({
            id,
            name,
            email,
            password
        })
        .into(UserDatabase.TABLE_NAME)
    }
}