import {neon} from "@neondatabase/serverless";
import "dotenv/config";

export async function initDB (){
    try {
        await sql `CREATE TABLE IF NOT EXISTS transactions(
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(225) NOT NULL,
        title VARCHAR(225) NOT NULL,
        ammount DECIMAL(10,2) NOT NULL,
        category VARCHAR(225) NOT NULL,
        created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`

        console.log('DATABASE initalised successfully')
    } catch (error) {
        console.log("ERROR initalising DB",error);
        process.exit(1) // exit code 1 means failure , 0 means success
    }
}

export const sql = neon(process.env.DATABASE_URL)