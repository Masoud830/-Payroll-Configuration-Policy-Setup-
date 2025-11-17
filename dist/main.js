"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const mongoose_1 = require("@nestjs/mongoose");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    try {
        const connection = app.get((0, mongoose_1.getConnectionToken)());
        console.log('✅ MongoDB connected successfully!');
        if (connection.db) {
            console.log('Database:', connection.db.databaseName);
        }
        console.log('Host:', connection.host);
    }
    catch (error) {
        console.error('❌ MongoDB connection error:', error);
    }
    const port = process.env.PORT ?? 3000;
    try {
        await app.listen(port);
        console.log(`🚀 Application is running on: http://localhost:${port}`);
        console.log(`📝 CRUD endpoints available at: http://localhost:${port}/payroll-schemas`);
    }
    catch (error) {
        if (error.code === 'EADDRINUSE') {
            console.error(`\n❌ Port ${port} is already in use!`);
            console.error(`\n💡 To fix this, run one of the following:`);
            console.error(`   1. Kill the process: .\\kill-port.ps1 -Port ${port}`);
            console.error(`   2. Use a different port: PORT=3001 npm run start:dev`);
            console.error(`   3. Find and kill manually: Get-NetTCPConnection -LocalPort ${port} | Stop-Process -Id {OwningProcess} -Force\n`);
            process.exit(1);
        }
        else {
            throw error;
        }
    }
}
bootstrap();
//# sourceMappingURL=main.js.map