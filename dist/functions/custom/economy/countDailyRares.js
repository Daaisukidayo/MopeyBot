"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "countDailyRares",
    description: "adds raretry/raretryrun catches to today's quest, capped at its max. finishing it sends the cmd reply (has to be ready) + a notice in a new msg",
    params: [
        {
            name: "command",
            description: "raretry or raretryrun",
            type: forgescript_1.ArgType.String,
            required: true,
        },
        {
            name: "count",
            description: "rares caught just now",
            type: forgescript_1.ArgType.Number,
            required: true,
        },
    ],
    code: `
    $c[raretry_rares + maxRaretryRares or the raretryrun pair. capped so the notice only goes out once, the caller saves]
    $callMethod[userProfile;refreshChecklist]
    $let[counter;$env[command]_rares]
    $let[max;$getGlobalVar[max$toTitleCase[$env[command]]Rares]]
    $let[had;$jsonGet[userProfile;checklist;$get[counter]]]
    $if[$get[had]>=$get[max];$return]

    $let[now;$math[$get[had] + $env[count]]]
    $!jsonSet[userProfile;checklist;$get[counter];$min[$get[now];$get[max]]]
    $if[$get[now]<$get[max];$return]

    $c[send the cmd reply first, then the notice as its own msg]
    $!send
    $sendMessage[$channelID;
      $addTextDisplay[$tl[ui.special.caughtRares.$jsonGet[userProfile;language];<@$authorID>;$get[max];$env[command]]]
    ]
  `,
});
//# sourceMappingURL=countDailyRares.js.map