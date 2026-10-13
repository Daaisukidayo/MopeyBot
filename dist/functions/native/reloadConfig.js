"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const forge_db_1 = require("@tryforge/forge.db");
const loadVariables_1 = require("../../utils/loadVariables");
exports.default = new forgescript_1.NativeFunction({
    name: "$reloadConfig",
    description: "Reads res/config again and makes it the defaults of the global variables. A value set with $setGlobalVar stays in front of its default. Returns how many variables were read",
    unwrap: false,
    output: forgescript_1.ArgType.Number,
    execute() {
        const variables = (0, loadVariables_1.readVariables)();
        forge_db_1.ForgeDB.variables(variables);
        return this.success(Object.keys(variables).length);
    }
});
//# sourceMappingURL=reloadConfig.js.map