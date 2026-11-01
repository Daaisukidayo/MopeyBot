"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const forge_db_1 = require("@tryforge/forge.db");
const loadVariables_1 = require("../../utils/loadVariables");
exports.default = new forgescript_1.NativeFunction({
    name: "$reloadConfig",
    description: "rereads res/config and makes it the global var defaults. values set w/ setGlobalVar still win. returns how many vars were read",
    unwrap: false,
    output: forgescript_1.ArgType.Number,
    execute() {
        const variables = (0, loadVariables_1.readVariables)();
        forge_db_1.ForgeDB.variables(variables);
        return this.success(Object.keys(variables).length);
    },
});
//# sourceMappingURL=reloadConfig.js.map