import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "countDailyRares",
  description:
    "Adds the rares caught today in raretry or raretryrun to the user's daily task. When the task is done, sends the command's reply (it must be ready), tells the user in a new message and returns true, so the caller marks the day as done.",
  output: ArgType.Boolean,
  params: [
    {
      name: "command",
      description: "raretry or raretryrun",
      type: ArgType.String,
      required: true,
    },
    {
      name: "count",
      description: "The rares caught now",
      type: ArgType.Number,
      required: true,
    },
  ],
  code: `
    $c[caughtRaresInRaretry and maxRaretryRares, or the same with Raretryrun]
    $let[counter;caughtRaresIn$toTitleCase[$env[command]]]
    $let[max;$getGlobalVar[max$toTitleCase[$env[command]]Rares]]

    $setUserVar[$get[counter];$math[$getUserVar[$get[counter]] + $env[count]]]
    $if[$getUserVar[$get[counter]]<$get[max];$return[false]]

    $c[The command's reply is sent first, then the notice in its own message]
    $!send
    $sendMessage[$channelID;
      $addTextDisplay[$tl[ui.special.caughtRares.$jsonGet[userProfile;language];<@$authorID>;$get[max];$env[command]]]
    ]
    $return[true]
  `,
})
