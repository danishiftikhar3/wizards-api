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
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const logger_1 = __importDefault(require("./logger"));
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
function asyncHandler(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(next);
    };
}
app.get("/houses", asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name } = req.query;
    try {
        const response = yield axios_1.default.get("https://wizard-world-api.herokuapp.com/houses");
        let houses = response.data;
        if (name) {
            houses = houses.filter((house) => house.name.toLowerCase().includes(name.toLowerCase()));
        }
        res.json(houses);
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            const message = ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data.message) ||
                "Error fetching data from external API";
            logger_1.default.error(message);
            next(new Error(message));
        }
        else {
            next(error);
        }
    }
})));
app.use((err, req, res, next) => {
    logger_1.default.error(err.stack);
    const statusCode = err.statusCode || 500;
    const errorMessage = statusCode === 500 ? "Internal Server Error" : err.message;
    res.status(statusCode).json({
        error: true,
        message: errorMessage,
    });
});
app.listen(port, () => {
    logger_1.default.info(`Server running at http://localhost:${port}`);
});
