"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "handleSlots",
    code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $checkProfile
    $addCooldown

    $let[amount;$parseBet[slots;$getGlobalVar[defaultSlotsBet];$getGlobalVar[maxSlotsBet];$default[$option[amount];$message[0]]]]

    $defer

    $fn[content;
      $return[$trim[$trimLines[
        ‎ $tl[ui.slots.title.$get[l]]
        \` \` $get[slot1]|$get[slot2]|$get[slot3] \` \` $tl[ui.slots.bet.$get[l];$userDisplayName;$separate[$get[amount]]] $get[outputContent]
        ‎  \`|         |\`
        ‎  \`|         |\`
      ]]]
    ]

    $c[3 of a kind wins bet x multiplier]
    $arrayLoad[emojis;,;<:WatermelonS2:1417213697738281091>,<:MelonS1:1417945198335623219>,$getGlobalVar[mopecoin],<:gem:1417945445916999842>]
    $jsonLoad[multipliers;$arrayOf[2;4;8;20]]

    $let[slot1;⬜]
    $let[slot2;⬜]
    $let[slot3;⬜]

    $arrayMap[$arrayRange[1;3];o;$return[$arraySample[emojis]];output]
    $let[won;$checkCondition[$jsonSize[$arrayUnique[output]]==1]]

    $callMethod[userProfile;takeCoins;$get[amount]]
    $callMethod[userProfile;save]

    $addTextDisplay[$callFn[content]]
    $let[msgid;$send]

    $wait[2000]
    $let[slot1;$jsonGet[output;0]]
    $!editMessage[$channelID;$get[msgid];$addTextDisplay[$callFn[content]]]

    $wait[1000]
    $let[slot2;$jsonGet[output;1]]
    $!editMessage[$channelID;$get[msgid];$addTextDisplay[$callFn[content]]]

    $wait[1000]
    $let[slot3;$jsonGet[output;2]]

    $if[$get[won];
      $let[winAmount;$math[$get[amount] * $jsonGet[multipliers;$arrayIndexOf[emojis;$get[slot1]]]]]
      $let[outputContent;$tl[ui.slots.won.$get[l];$separate[$get[winAmount]]]]

      $c[re-read the profile, it might've changed mid-spin]
      $jsonLoad[userProfile;$getProfile]
      $callMethod[userProfile;addCoins;$get[winAmount]]
      $callMethod[userProfile;save]
    ;
      $let[outputContent;$tl[ui.slots.lost.$get[l]]]
    ]

    $!editMessage[$channelID;$get[msgid];$addTextDisplay[$callFn[content]]]
  `,
});
//# sourceMappingURL=slots.js.map