import knex from 'knex';
import Knex from 'knex';

export abstract class BaseDatabase {
    private static KNEX_CONNECTION: Knex | null = null;

    protected connection(){
        if(BaseDatabase.KNEX_CONNECTION === null){
            BaseDatabase.KNEX_CONNECTION = knex({
                client: "mysql",
                connection:{
                    host: process.env.DB_HOST,
                    port: 3306,
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_DATABASE_NAME,
                },
            });
           
        } 
      
      return BaseDatabase.KNEX_CONNECTION
    }

    public static async destroyConnection(){
        if(BaseDatabase.KNEX_CONNECTION !== null){
            await BaseDatabase.KNEX_CONNECTION.destroy()
        }
        BaseDatabase.KNEX_CONNECTION = null
    }

    protected convertBooleanToTinyInt(value: boolean): number {
        return value ? 1 : 0;
    }

    protected convertTinyIntToBoolean(value: number): boolean {
        return value === 1;
    }
}