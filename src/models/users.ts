import Client from '../database/database'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()

export  type Users = {
    id?: Number;
    firstname: string;
    lastname: string;
    password: string;
}
export type Id = {
    id:string
}
export type EditUser = {
    firstname: string;
    lastname: string;
    id:number
}

export class UserModel {
    // get all users
    async index(): Promise<Users[]> {
        try {
            const connection = await Client.connect();
            const query = 'SELECT * FROM users';
            const result = await connection.query(query);
            connection.release()
            return result.rows
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }
    // getuser by id
   async show(id:string): Promise<Users[]>  {
    const connection = await Client.connect();
       try {
            const query = `SELECT * FROM users WHERE id=($1)`;
            const result = await connection.query(query, [id]);
           connection.release()
            return result.rows[0]
       } catch (error) {
            throw new Error(`Error: ${error}`)

       }
    }
    // add user
    async create(user:Users): Promise<Users> {
        try {
            const connection = await Client.connect();
            const sql = 'INSERT INTO users (firstname, lastname, password) VALUES ($1, $2, $3) RETURNING * ';
            const hash = bcrypt.hashSync(user.password + process.env.PEPPER, 10);
            const result = await connection.query(sql, [user.firstname, user.lastname, hash]);
            const response = result
            connection.release()
            return response.rows[0]
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }

    // edit user
    async edit(user: EditUser): Promise<Users[]> {
        console.log(user, 'user')
        try {
            const connection = await Client.connect();
            const sql = `UPDATE users SET (firstname, lastname) = ($1, $2) WHERE id=${user.id}`;
            const result = await connection.query(sql, [user.firstname, user.lastname]);
            const response = result
            connection.release()
            return response.rows
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }
    async deleteUser(id: number): Promise <Id> {
        try {
             const connection = await Client.connect();
            const sql = 'DELETE FROM users WHERE id=($1)'
                console.log('id', id)
            const result = await connection.query(sql, [id]);
            return result.rows[0]
        } catch (error) {
            throw new Error(`Error: ${error}`)
    
        }
    }
}