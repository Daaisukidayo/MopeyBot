import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "addCooldown",
  description: "puts the user on cooldown and tells them if they already are",
  brackets: false,
  params: [
    {
      name: "cooldownId",
      description: "the cooldown id",
      type: ArgType.String,
      required: false,
    },
    {
      name: "updateCooldownTime",
      description: "restart the cooldown instead of checking it",
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
})
