"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.BaseCommand({
    type: "connect",
    code: `
    $logger[Info;Connected to the database | Ping: $dbPingms]

    $c[One-time migration: mope.io animal IDs, wardrobe skin ids]
    $if[$getGlobalVar[animalIdsMigrated;false]==false;
      $logger[Info;Moved $migrateAnimalIds records to the new animal IDs]
      $setGlobalVar[animalIdsMigrated;true]
    ]

    $c[One-time migration: history end dates as numbers]
    $if[$getGlobalVar[timestampsMigrated;false]==false;
      $logger[Info;Moved $migrateTimestamps records to timestamps as numbers]
      $setGlobalVar[timestampsMigrated;true]
    ]
  `
});
//# sourceMappingURL=connect.js.map