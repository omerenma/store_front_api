"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersModel = void 0;
const database_1 = __importDefault(require("../database/database"));
class OrdersModel {
    // get all products
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const query = 'SELECT * FROM orders';
                const result = yield connection.query(query);
                connection.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Error: ${error}`);
            }
        });
    }
    // get products by id
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield database_1.default.connect();
            try {
                const query = `SELECT * FROM orders WHERE id=($1)`;
                const result = yield connection.query(query, [id]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Error: ${error}`);
            }
        });
    }
    // add 
    create(order) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield database_1.default.connect();
            try {
                const query = 'INSERT INTO orders ( product_id, quantity, user_id, status) VALUES ($1, $2, $3, $4) RETURNING *';
                const result = yield connection.query(query, [order.product_id, order.quantity, order.user_id, order.status]);
                const response = result;
                connection.release();
                return response.rows;
            }
            catch (error) {
                throw new Error(`Error: ${error}`);
            }
        });
    }
    addProducts(quantity, orderId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3)';
                const connection = yield database_1.default.connect();
                const result = yield connection.query(query, [quantity, orderId, productId]);
                const order = result.rows[0];
                connection.release();
                return order;
            }
            catch (error) {
                throw new Error(`Could not add product ${productId} to order ${orderId} ${error}`);
            }
        });
    }
}
exports.OrdersModel = OrdersModel;
