"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shutdownSetup = shutdownSetup;
const forgescript_1 = require("@tryforge/forgescript");
async function shutdownSetup(client) {
    ['SIGINT', 'SIGTERM'].forEach(signal => process.on(signal, () => {
        forgescript_1.Logger.info(`Bot has been shut down`);
        client.destroy();
        process.exit(0);
    }));
}
//# sourceMappingURL=shutdownSetup.js.map