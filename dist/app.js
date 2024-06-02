"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const config_1 = __importDefault(require("./config"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerConfig_1 = __importDefault(require("./swaggerConfig"));
const auth_1 = __importDefault(require("./middlewares/auth"));
require("./types/express");
// Load environment variables
dotenv_1.default.config();
const auth_2 = __importDefault(require("./routes/auth"));
const restaurant_1 = __importDefault(require("./routes/restaurant"));
const menu_1 = __importDefault(require("./routes/menu"));
const cart_1 = __importDefault(require("./routes/cart"));
const order_1 = __importDefault(require("./routes/order"));
const app = (0, express_1.default)();
// Middleware
app.use(body_parser_1.default.json());
// Use routes
app.use('/api/auth', auth_2.default);
app.use('/api/restaurants', auth_1.default, restaurant_1.default);
app.use('/api/menu', auth_1.default, menu_1.default);
app.use('/api/cart', auth_1.default, cart_1.default);
app.use('/api/orders', auth_1.default, order_1.default);
// Swagger documentation
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerConfig_1.default));
// Database connection
mongoose_1.default.connect(config_1.default.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
exports.default = app;
