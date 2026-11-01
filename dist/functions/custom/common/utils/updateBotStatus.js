"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "updateBotStatus",
    description: "shows both bot statuses in turn, 15s each (one call takes 15s)",
    code: `
    $if[$getGlobalVar[botEnabled];
      $setStatus[idle;Watching;$guildCount servers!]
    ;
      $setStatus[dnd;Custom;Disabled for maintenance]
    ]

    $wait[15s]

    $if[$getGlobalVar[botEnabled];
      $setStatus[idle;Playing;$getGlobalVar[prefix]help]
    ;
      $setStatus[dnd;Custom;Disabled for maintenance]
    ]
  `,
});
//# sourceMappingURL=updateBotStatus.js.map