"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require('dotenv').config();
// Create a new express application instance
const app = express_1.default();
// rest of the code remains same
app.set('port', process.env.PORT || 3000);
// Middleware
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
// Routes /src/Routes
app.use('/', require('../routes/index'));
app.use('/api/usuarios', require('../routes/users'));
// Starting server
app.listen(app.get('port'), function () {
    console.log('Aplication listening on port ', app.get('port'));
});
