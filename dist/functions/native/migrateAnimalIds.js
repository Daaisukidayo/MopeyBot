"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const util_1 = require("@tryforge/forge.db/dist/util");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const animalIdsMigration_1 = require("../../utils/animalIdsMigration");
exports.default = new forgescript_1.NativeFunction({
    name: "$migrateAnimalIds",
    description: "Moves every saved record to the mope.io animal IDs and the wardrobes to skin ids. The old values of the changed records are saved to database/ first. Returns how many records changed",
    unwrap: false,
    output: forgescript_1.ArgType.Number,
    async execute() {
        const read = (file) => JSON.parse(fs_1.default.readFileSync(path_1.default.join(process.cwd(), file), "utf8"));
        const migrate = (0, animalIdsMigration_1.animalIdsMigrator)(read("res/data/migrations/animalIds.json"), read("res/data/animals/skins.json"));
        const changed = [];
        for (const record of await util_1.DataBase.getAll()) {
            if (typeof record.value !== "string")
                continue;
            const value = migrate(record.name, record.value);
            if (value !== record.value)
                changed.push({ record, value });
        }
        if (changed.length === 0)
            return this.success(0);
        const dir = path_1.default.join(process.cwd(), "database");
        fs_1.default.mkdirSync(dir, { recursive: true });
        fs_1.default.writeFileSync(path_1.default.join(dir, `animal-ids-backup-${Date.now()}.json`), JSON.stringify(changed.map((c) => c.record), null, 2));
        for (const { record, value } of changed)
            await util_1.DataBase.set({ ...record, value });
        return this.success(changed.length);
    }
});
//# sourceMappingURL=migrateAnimalIds.js.map