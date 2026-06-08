"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "addCooldown",
    description: "Adds a cooldown message to user.",
    params: [
        {
            name: "_cooldownId",
            description: "Id for the cooldown",
            required: false,
        },
        {
            name: "_updateCooldownTime",
            type: "Boolean",
            required: false,
        },
    ],
    brackets: false,
    code: `
    $if[$env[userProfile;devMode]!=0;$return]

    $let[command;$nullish[$env[_cooldownId];$toCamelCase[$applicationSubCommandName $applicationSubCommandGroupName];$commandName]]
    $let[time;$getGlobalVar[$get[command]_cooldown]]

    $if[$get[time]==;
      $newError[Failed to get the cooldown time for the \`$get[command]\` command.]
    ]

    $if[$env[_updateCooldownTime];
      $deleteCooldown[$get[command]-$authorID]
    ]

    $cooldown[$get[command]-$authorID;$get[time];
      $let[cooldownTime;$getCooldownTime[$get[command]-$authorID]]
      
      $if[$isPrefixCommand;
        $cooldown[cooldownEmbed;10s;
          $if[$get[cooldownTime]>10000;
            $wait[10000]
          ;
            $wait[$get[cooldownTime]] 
          ]
          $deleteCooldown[cooldownEmbed]
        ]
      ]

      $newCooldown[$get[cooldownTime]]
    ]
  `
};
//# sourceMappingURL=addCooldown.js.map