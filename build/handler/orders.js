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
const orders_1 = require("../models/orders");
const getOrders = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = new orders_1.OrdersModel();
        const result = yield users.index();
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
const getOderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = new orders_1.OrdersModel();
        const result = yield user.show(id);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
const addOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        product_id: req.body.product_id,
        quantity: req.body.quantity,
        user_id: req.body.user_id,
        status: req.body.status
    };
    try {
        const order = new orders_1.OrdersModel();
        const result = yield order.create(data);
        res.status(200).send(result);
    }
    catch (error) {
        res.json(error);
    }
});
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body, req.params);
    const order = new orders_1.OrdersModel();
    const orderId = req.params.id;
    const productId = (req.body.productId);
    const quantity = req.body.quantity;
    try {
        const addedProduct = yield order.addProducts(quantity, orderId, productId);
        res.json(addedProduct);
    }
    catch (error) {
        console.log(error);
        res.send(error);
    }
});
const ordersRoutes = (app) => {
    app.get('/orders', getOrders);
    app.get('/orders/:id', getOderById);
    app.post('/orders', addOrder);
    app.post('/orders/:id/products', addProduct);
};
exports.default = ordersRoutes;
