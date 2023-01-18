"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sayHello_1 = __importDefault(require("../sayHello"));
describe('sayHello funcction', () => {
    it('should return hello', () => {
        expect((0, sayHello_1.default)('hello')).toContain('hello');
    });
});
