import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "updateBotStatus",
  description: "Shows both bot statuses in turn, 15 seconds each (one call takes 15 seconds)",
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
  `
})
