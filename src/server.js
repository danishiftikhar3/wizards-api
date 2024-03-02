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
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
const port = 3000;
app.get('/houses', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.query; // Type assertion for query parameter
    try {
        // Fetch data from the external API
        const response = yield axios_1.default.get('https://wizard-world-api.herokuapp.com/houses');
        let houses = response.data; // Type assertion for houses array
        // Filter houses if name query parameter is provided
        if (name) {
            houses = houses.filter(house => house.name.toLowerCase().includes(name.toLowerCase()));
        }
        // Send filtered data back to the client
        res.json(houses);
    }
    catch (error) {
        res.status(500).send('Error fetching houses data');
    }
}));
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
