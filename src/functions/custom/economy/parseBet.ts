import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "parseBet",
  description:
    "Reads the bet of a game: 'all' is the maximum, no number is the minimum, more than the balance is the whole balance. A bet that can't be made stops the command with an error.",
  output: ArgType.Number,
  params: [
    {
      name: "command",
      description: "The game, whose texts are used: coinflip or slots",
      type: ArgType.String,
      required: true
    },
    {
      name: "minimum",
      description: "The smallest bet",
      type: ArgType.Number,
      required: true
    },
    {
      name: "maximum",
      description: "The biggest bet",
      type: ArgType.Number,
      required: true
    },
    {
      name: "amount",
      description: "The bet as the user wrote it",
      type: ArgType.String,
      required: false
    }
  ],
  code: `
    $let[l;$jsonGet[userProfile;language]]
    $let[MC;$jsonGet[userProfile;MC]]
    $let[amount;$advancedReplace[$toLowerCase[$env[amount]];all;$env[maximum]]]
    $let[amount;$min[$get[MC];$if[$isNumber[$get[amount]];$round[$get[amount]];$env[minimum]]]]

    $onlyIf[$get[MC]>=$env[minimum];
      $newError[$tl[ui.$env[command].invalidCashLow.$get[l];$env[minimum]] $tl[ui.$env[command].balance.$get[l];$separate[$get[MC]]]]
    ]
    $onlyIf[$inRange[$get[amount];$env[minimum];$env[maximum]];
      $newError[$tl[ui.$env[command].invalidRange.$get[l];$env[minimum];$separate[$env[maximum]]]]
    ]
    $return[$get[amount]]
  `
})
