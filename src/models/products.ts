import Client from '../database/database'

export  type Products = {
    id?: Number;
    name: string;
    price: Number;
}
export type Id = {
    id:number
}
export class ProductsModel {
    // get all products
    async index(): Promise<Products[]> {
        try {
            const connection = await Client.connect();
            const query = 'SELECT * FROM products';
            const result = await connection.query(query);
            connection.release()
            return result.rows
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }
    // get products by id
   async show(id:string): Promise<Products[]>  {
    const connection = await Client.connect();
       try {
            const query = `SELECT * FROM products WHERE id=($1)`;
            const result = await connection.query(query, [id]);
            connection.release()
            return result.rows[0]
       } catch (error) {
            throw new Error(`Error: ${error}`)

       }
    }
    // add products
    async create(products: Products): Promise<Products[]> {
        try {
            const connection = await Client.connect(); 
            const query = 'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING * '
            const result = await connection.query(query, [products.name, products.price]);
            const response = result.rows
            connection.release()
            return response
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }

    async editProducts(product: Products): Promise<Products> {
        try {
            const connection = await Client.connect();
            const sql = `UPDATE products SET (name, price) = ($1, $2) WHERE id=${product.id}`;
            const result = await connection.query(sql, [product.name, product.price]);
                const response = result
                connection.release()
                return response.rows[0]
            } catch (error) {
                throw new Error(`Error: ${error}`)
            }
    }
    async deleProduct(id: number): Promise<Id> {
        console.log('id', id)
        try {
             const connection = await Client.connect();
            const sql = `DELETE FROM products WHERE id=${id}`
            const result = await connection.query(sql, [id]);
            return result.rows[0]
        } catch (error) {
            throw new Error(`Error: ${error}`)
    
        }
    }
}