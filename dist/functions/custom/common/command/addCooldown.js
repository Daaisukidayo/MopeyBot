"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "addCooldown",
    description: "Adds a cooldown message to user.",
    brackets: false,
    params: [
        {
            name: "cooldownId",
            description: "Id for the cooldown",
            type: forgescript_1.ArgType.String,
            required: false,
        },
        {
            name: "updateCooldownTime",
            description: "Whether to start the cooldown over instead of checking it.",
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

      $c[A prefix command shows its cooldown message once in 10 seconds at most]
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