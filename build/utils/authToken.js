"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        const token = authorization === null || authorization === void 0 ? void 0 : authorization.split(' ')[1];
        const bearer = authorization === null || authorization === void 0 ? void 0 : authorization.split(' ')[0];
        let decode;
        if (token) {
            decode = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        }
        if (decode) {
            next();
        }
        else {
            throw Error('You do not have the permision to do this');
        }
    }
    catch (error) {
        res.status(401);
        res.json('Unauthorized');
    }
};
exports.verifyToken = verifyToken;
