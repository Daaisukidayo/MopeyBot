import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "addCooldown",
  description: "Adds a cooldown message to user.",
  brackets: false,
  params: [
    {
      name: "cooldownId",
      description: "Id for the cooldown",
      type: ArgType.String,
      required: false,
    },
    {
      name: "updateCooldownTime",
      description: "Whether to start the cooldown over instead of checking it.",
      type: ArgType.Boolean,
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
})
