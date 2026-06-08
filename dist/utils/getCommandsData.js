"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commandsData = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
const filePath = (0, path_1.join)(process.cwd(), 'res/data/commandsData.json');
exports.commandsData = JSON.parse((0, fs_1.readFileSync)(filePath, 'utf8'));
//# sourceMappingURL=getCommandsData.js.map