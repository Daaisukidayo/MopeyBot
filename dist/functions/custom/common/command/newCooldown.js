"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "newCooldown",
    description: "sends the cooldown msg",
    params: [
        {
            name: "cooldownTime",
            description: "how long until the cooldown ends",
            type: forgescript_1.ArgType.String,
        },
    ],
    code: `
    $let[l;$jsonGet[userProfile;language]]
    $c[ms or a duration like 5m]
    $let[cooldownTime;$if[$isNumber[$env[cooldownTime]];$env[cooldownTime];$parseString[$env[cooldownTime]]]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[# ⏰ $tl[ui.cooldown.title.$get[l]]]
      $addSeparator[Small;false]
      $addTextDisplay[## > _$tl[ui.cooldown.description.$get[l];$discordTimestamp[$math[$get[cooldownTime] + $getTimestamp + 1000];RelativeTime]]_]
    ;$getGlobalVar[cooldownColor]]

    $c[the msg dies when the cooldown ends, 15s max]
    $let[deleteTime;$if[$or[$get[cooldownTime]>15000;$get[cooldownTime]==0];15000;$get[cooldownTime]]]

    $if[$isPrefixCommand;
      $deleteIn[$get[deleteTime]]
    ;
      $ephemeral
      $interactionReply

      $setTimeout[
        $interactionDelete
      ;$get[deleteTime]]
    ]
  `,
});
//# sourceMappingURL=newCooldown.js.map