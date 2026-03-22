export default {
  name: "addCooldown",
  description: "Adds a cooldown message to user.",
  params: [
    {
      name: "cooldownId",
      description: "Id for the cooldown",
      required: false,
    },
    {
      name: "updateCooldownTime",
      type: "Boolean",
      required: false,
    },
  ],
  brackets: false,
  code: `
    $if[$env[userProfile;devMode]!=0;$return]

    $let[command;$nullish[$env[cooldownId];$default[$commandName;$applicationCommandName]]]
    $let[time;$getGlobalVar[$get[command]_cooldown]]

    $if[$get[time]==;
      $newError[Failed to get the cooldown time for the \`$get[command]\` command.]
    ]

    $if[$env[updateCooldownTime];
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
}