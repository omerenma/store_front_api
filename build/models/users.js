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
exports.UserModel = void 0;
const database_1 = __importDefault(require("../database/database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class UserModel {
    // get all users
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const query = 'SELECT * FROM users';
                const result = yield connection.query(query);
                connection.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Error: ${error}`);
            }
        });
    }
    // getuser by id
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield database_1.default.connect();
            try {
                const query = `SELECT * FROM users WHERE id=($1)`;
                const result = yield connection.query(query, [id]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Error: ${error}`);
            }
        });
    }
    // add user
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'INSERT INTO users (firstname, lastname, password) VALUES ($1, $2, $3) RETURNING * ';
                const hash = bcrypt_1.default.hashSync(user.password + process.env.PEPPER, 10);
                const result = yield connection.query(sql, [user.firstname, user.lastname, hash]);
                const response = result;
                connection.release();
                return response.rows[0];
            }
            catch (error) {
                throw new Error(`Error: ${error}`);
            }
        });
    }
    // edit user
    edit(user) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(user, 'user');
            try {
                const connection = yield database_1.default.connect();
                const sql = `UPDATE users SET (firstname, lastname) = ($1, $2) WHERE id=${user.id}`;
                const result = yield connection.query(sql, [user.firstname, user.lastname]);
                const response = result;
                connection.release();
                return response.rows;
            }
            catch (error) {
                throw new Error(`Error: ${error}`);
            }
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'DELETE FROM users WHERE id=($1)';
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
exports.UserModel = UserModel;
