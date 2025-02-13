"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
    port: process.env.PORT,
    baseUrl: process.env.DATABASE_URL,
    JWT_ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN,
    NODE_ENV: process.env.NODE_ENV,
    JWT_ACCESS_TOKEN_EXPIRE_IN_ACCESSION: process.env.JWT_ACCESS_TOKEN_EXPIRE_IN_ACCESSION,
    sp: {
        sp_endpoint: process.env.SP_ENDPOINT,
        sp_username: process.env.SP_USERNAME,
        sp_password: process.env.SP_PASSWORD,
        sp_prefix: process.env.SP_PREFIX,
        sp_return_url: process.env.SP_RETURN_URL,
        db_file: process.env.DB_FILE,
    },
};
