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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = require("../models/users");
const authToken_1 = require("../utils/authToken");
const getUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = new users_1.UserModel();
        const result = yield users.index();
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = new users_1.UserModel();
        const result = yield user.show(id);
        if (!result) {
            res.send('No users found');
        }
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password
    };
    try {
        const user = new users_1.UserModel();
        const result = yield user.create(data);
        let token = jsonwebtoken_1.default.sign({ payload: result }, process.env.TOKEN_SECRET, { expiresIn: 3600 });
        res.status(200).send(token);
    }
    catch (error) {
        res.json(error);
    }
});
const editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        id: parseInt(req.params.id)
    };
    try {
        const user = new users_1.UserModel();
        const result = yield user.edit(data);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = new users_1.UserModel();
        const result = yield user.deleteUser(parseInt(id));
        res.status(200).json(result);
    }
    catch (error) {
        console.log(error, 'user error');
        res.status(400).json(error);
    }
});
const usersRoutes = (app) => {
    app.get('/users', authToken_1.verifyToken, getUsers);
    app.get('/user/:id', authToken_1.verifyToken, getUserById);
    app.post('/user', addUser);
    app.put('/user/:id', editUser);
    app.delete('/user/:id', deleteUser);
};
exports.default = usersRoutes;
