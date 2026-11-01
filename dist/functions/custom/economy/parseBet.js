"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "parseBet",
    description: "parses a game bet: 'all' = the max, no number = the min, more than the balance = the whole balance. a bet that can't be made stops the command w/ an error",
    output: forgescript_1.ArgType.Number,
    params: [
        {
            name: "command",
            description: "the game whose texts to use: coinflip or slots",
            type: forgescript_1.ArgType.String,
            required: true,
        },
        {
            name: "minimum",
            description: "the smallest bet",
            type: forgescript_1.ArgType.Number,
            required: true,
        },
        {
            name: "maximum",
            description: "the biggest bet",
            type: forgescript_1.ArgType.Number,
            required: true,
        },
        {
            name: "amount",
            description: "the bet as the user typed it",
            type: forgescript_1.ArgType.String,
            required: false,
        },
    ],
    code: `
    $let[l;$jsonGet[userProfile;language]]
    $let[MC;$jsonGet[userProfile;mope_coins]]
    $let[amount;$advancedReplace[$toLowerCase[$env[amount]];all;$env[maximum]]]
    $let[amount;$min[$get[MC];$if[$isNumber[$get[amount]];$round[$get[amount]];$env[minimum]]]]

    $onlyIf[$get[MC]>=$env[minimum];
      $newError[$tl[ui.$env[command].invalidCashLow.$get[l];$env[minimum]] $tl[ui.$env[command].balance.$get[l];$separate[$get[MC]]]]
    ]
    $onlyIf[$inRange[$get[amount];$env[minimum];$env[maximum]];
      $newError[$tl[ui.$env[command].invalidRange.$get[l];$env[minimum];$separate[$env[maximum]]]]
    ]
    $return[$get[amount]]
  `,
});
//# sourceMappingURL=parseBet.js.map