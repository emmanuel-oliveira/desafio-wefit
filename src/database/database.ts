import dotenv from 'dotenv';

import knex from "knex";


dotenv.config();

export const setupKnex = knex({
    client: "mysql2",
    connection: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT || "3307"),
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    }
})


export interface KnexError extends Error {
    code: string; 
    sqlMessage: string;
}

