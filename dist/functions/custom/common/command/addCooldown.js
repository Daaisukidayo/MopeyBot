"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "addCooldown",
    description: "puts the user on cooldown and tells them if they already are",
    brackets: false,
    params: [
        {
            name: "cooldownId",
            description: "the cooldown id",
            type: forgescript_1.ArgType.String,
            required: false,
        },
        {
            name: "updateCooldownTime",
            description: "restart the cooldown instead of checking it",
            type: forgescript_1.ArgType.Boolean,
            required: false,
        },
    ],
    code: `
    $if[$isDev;$return]

    $let[command;$commandKey[$env[cooldownId]]]
    $let[time;$getGlobalVar[$get[command]_cooldown]]

    $if[$get[time]==;
      $newError[Failed to get the cooldown time for the \`$get[command]\` command.]
    ]

    $if[$env[updateCooldownTime];
      $deleteCooldown[$get[command]-$authorID]
    ]

    $cooldown[$get[command]-$authorID;$get[time];
      $let[cooldownTime;$getCooldownTime[$get[command]-$authorID]]

      $c[prefix cmds show the cooldown msg at most once per 10s]
      $if[$isPrefixCommand;
        $cooldown[cooldownEmbed;10s;
          $wait[$min[$get[cooldownTime];10000]]
          $deleteCooldown[cooldownEmbed]
        ]
      ]

      $newCooldown[$get[cooldownTime]]
    ]
  `,
});
//# sourceMappingURL=addCooldown.js.map