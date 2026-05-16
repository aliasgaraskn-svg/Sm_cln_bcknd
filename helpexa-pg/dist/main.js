"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const express_session_1 = __importDefault(require("express-session"));
const promise_1 = __importDefault(require("mysql2/promise"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
async function bootstrap() {
    const connection = await promise_1.default.createConnection({
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306'),
        user: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD,
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_DATABASE || 'helpexa_db'}\``);
    await connection.end();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, express_session_1.default)({
        secret: process.env.SESSION_SECRET || 'secret',
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
        },
    }));
    app.enableCors({
        origin: 'http://localhost:5174',
        credentials: true,
    });
    await app.listen(process.env.PORT ?? 3000);
    const serverUrl = await app.getUrl();
    console.log(`Application is running on: ${serverUrl}`);
    try {
        const seedConn = await promise_1.default.createConnection({
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '3306'),
            user: process.env.DB_USERNAME || 'root',
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE || 'helpexa_db',
            multipleStatements: true
        });
        const [userRows] = await seedConn.query('SELECT COUNT(*) as count FROM users');
        if (userRows[0].count === 0) {
            console.log('Database is empty. Seeding initial data from seed_data.sql...');
            const seedSql = fs.readFileSync(path.join(process.cwd(), 'seed_data.sql'), 'utf8');
            const queries = seedSql.split(';').filter(q => q.trim().length > 0);
            for (const query of queries) {
                await seedConn.query(query);
            }
            console.log('Seeding completed successfully!');
        }
        await seedConn.end();
    }
    catch (err) {
        console.error('Auto-seeding failed:', err.message);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map