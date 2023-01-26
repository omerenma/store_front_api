import Client from '../database/database'

export  type Order = {
    id?: Number;
    product_id: Number;
    quantity: Number;
    user_id: string;
    status: string;
}

export class OrdersModel {
    // get all products
    async index(): Promise<Order[]> {
        try {
            const connection = await Client.connect();
            const query = 'SELECT * FROM orders';
            const result = await connection.query(query);
            connection.release()
            return result.rows
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }
    // get products by id
   async show(id:string): Promise<Order[]>  {
    const connection = await Client.connect();
       try {
            const query = `SELECT * FROM orders WHERE id=($1)`;
            const result = await connection.query(query, [id]);
            connection.release()
            return result.rows[0]
       } catch (error) {
            throw new Error(`Error: ${error}`)

       }
    }
    // add 
    async create(order: Order): Promise<Order[]> {

        const connection = await Client.connect();
        try {
            const query = 'INSERT INTO orders ( product_id, quantity, user_id, status) VALUES ($1, $2, $3, $4) RETURNING *'
            const result = await connection.query(query, [order.product_id, order.quantity, order.user_id, order.status])
            const response = result
            connection.release()
            return response.rows
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }

    async addProducts(quantity: number, orderId: string, productId: number): Promise<Order>{
        try {
            const query = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3)'
            const connection = await Client.connect()
            const result = await connection.query(query, [quantity, orderId, productId])
            const order = result.rows[0]
            connection.release()
            return order
        } catch (error) {
            throw new Error(`Could not add product ${productId} to order ${orderId} ${error}`)
        }
    }

}