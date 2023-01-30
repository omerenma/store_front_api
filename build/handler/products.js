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
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../models/products");
const authToken_1 = require("../utils/authToken");
const getProducts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = new products_1.ProductsModel();
        const result = yield users.index();
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = new products_1.ProductsModel();
        const result = yield user.show(id);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        name: req.body.name,
        price: req.body.price
    };
    try {
        const product = new products_1.ProductsModel();
        const result = yield product.create(data);
        res.status(200).send(result);
    }
    catch (error) {
        res.json(error);
    }
});
const editProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = {
            name: req.body.name,
            price: Number(req.body.price),
            id: parseInt(req.params.id)
        };
        const product = new products_1.ProductsModel();
        const result = yield product.editProducts(data);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
const deleteProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        console.log(id);
        const product = new products_1.ProductsModel();
        const result = yield product.deleProduct(parseInt(id));
        res.status(200).json(result);
    }
    catch (error) {
        res.json(error);
        //res.status(400).json(error)
    }
});
const productsRoutes = (app) => {
    app.get('/products', getProducts);
    app.get('/products/:id', getProductById);
    app.post('/product', authToken_1.verifyToken, addProduct);
    app.put('/product/:id', editProducts);
    app.delete('/product/:id', deleteProducts);
};
exports.default = productsRoutes;
