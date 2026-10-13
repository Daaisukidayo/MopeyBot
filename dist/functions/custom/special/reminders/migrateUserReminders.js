"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "migrateUserReminders",
    code: `
    $if[$getGlobalVar[userRemindersMigrated;false];$return]

    $arrayForEach[$getGlobalVar[allUserIDs];id;
      $jsonLoad[userReminders;$getUserVar[userReminders;$env[id]]]
      $if[$arraySome[userReminders;reminder;$jsonType[reminder]==string];
        $setUserVar[userReminders;$arrayUnique[$arrayMap[userReminders;reminder;$return[$env[reminder]]]];$env[id]]
      ]
    ]

    $setGlobalVar[userRemindersMigrated;true]
  `
});
//# sourceMappingURL=migrateUserReminders.js.map