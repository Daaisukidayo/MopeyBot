"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.variables = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const variables = {};
exports.variables = variables;
function assignVariable(key, value) {
    if (Object.hasOwn(variables, key)) {
        throw new Error(`Name collision! Variable "${key}" is already defined.`);
    }
    variables[key] = value;
}
(() => {
    try {
        const configRootPath = path_1.default.join(process.cwd(), "res", "config");
        if (!fs_1.default.existsSync(configRootPath)) {
            console.warn(`⚠️ Configuration directory not found at: ${configRootPath}`);
            return;
        }
        const entries = fs_1.default.readdirSync(configRootPath, { withFileTypes: true });
        const dirs = entries
            .filter(entry => entry.isDirectory() && (!entry.name.startsWith('_') || !entry.name.startsWith('.')))
            .map(entry => entry.name);
        if (dirs.length === 0) {
            console.warn("⚠️ No valid sub-directories found in res/config.");
            return;
        }
        for (const dir of dirs) {
            const dirPath = path_1.default.join(configRootPath, dir);
            const allFiles = fs_1.default.readdirSync(dirPath);
            const jsonFiles = allFiles.filter(file => file.endsWith(".json"));
            if (jsonFiles.length === 0) {
                console.info(`ℹ️ Skipped empty directory "${dir}"`);
                continue;
            }
            for (const file of jsonFiles) {
                const filePath = path_1.default.join(dirPath, file);
                try {
                    const fileContent = fs_1.default.readFileSync(filePath, "utf-8");
                    const jsonData = JSON.parse(fileContent);
                    if (jsonData && typeof jsonData === 'object' && !Array.isArray(jsonData)) {
                        for (const [key, value] of Object.entries(jsonData)) {
                            assignVariable(key, value);
                        }
                    }
                    else {
                        console.warn(`⚠️ File [${dir}/${file}] must contain a valid JSON object.`);
                    }
                }
                catch (err) {
                    console.error(`❌ Error parsing JSON in [${dir}/${file}]:`, err.message);
                }
            }
        }
    }
    catch (err) {
        console.error("❌ Critical failure during configuration loading:", err);
    }
})();
//# sourceMappingURL=loadVariables.js.map