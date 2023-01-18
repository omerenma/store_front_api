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
exports.ProductsModel = void 0;
const database_1 = __importDefault(require("../database/database"));
class ProductsModel {
    // get all products
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const query = 'SELECT * FROM products';
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
                const query = `SELECT * FROM products WHERE id=($1)`;
                const result = yield connection.query(query, [id]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Error: ${error}`);
            }
        });
    }
    // add products
    create(products) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const query = 'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING * ';
                const result = yield connection.query(query, [products.name, products.price]);
                const response = result.rows;
                connection.release();
                return response;
            }
            catch (error) {
                throw new Error(`Error: ${error}`);
            }
        });
    }
    editProducts(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = `UPDATE products SET (name, price) = ($1, $2) WHERE id=${product.id}`;
                const result = yield connection.query(sql, [product.name, product.price]);
                const response = result;
                connection.release();
                return response.rows[0];
            }
            catch (error) {
                throw new Error(`Error: ${error}`);
            }
        });
    }
    deleProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'DELETE FROM products WHERE id=($1)';
                console.log('id', id);
                const result = yield connection.query(sql, [id]);
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Error: ${error}`);
            }
        });
    }
}
exports.ProductsModel = ProductsModel;
