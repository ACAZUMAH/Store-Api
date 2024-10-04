"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const xss_clean_1 = __importDefault(require("xss-clean"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const path_1 = __importDefault(require("path"));
const error_Handler_1 = __importDefault(require("../middlewares/error-Handler"));
const router_1 = __importDefault(require("../router"));
const docs = path_1.default.join(__dirname, '../../docs.yaml');
const swaggerDocument = yamljs_1.default.load(docs);
const limiterOptions = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
});
const startExpressApp = async () => {
    const app = (0, express_1.default)();
    app.set('trust proxy', 1);
    app.use(limiterOptions);
    app.use(express_1.default.json());
    app.use((0, helmet_1.default)());
    app.use((0, cors_1.default)());
    app.use((0, xss_clean_1.default)());
    router_1.default.get('/', (req, res) => {
        res.send('<h1>Welcome to the store API<h1><a href="https://documenter.getpostman.com/view/34362641/2sAXxMesWt">Docummantation</a>');
    });
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
    app.use(router_1.default);
    app.use(error_Handler_1.default);
    app.all('*', (req, res) => {
        res.status(404).json({
            message: 'Unable to find the requested resource!'
        });
    });
    return app;
};
exports.default = startExpressApp;
