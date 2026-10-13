"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "handleCoinflip",
    code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $checkProfile
    $addCooldown

    $let[amount;$parseBet[coinflip;5;$getGlobalVar[maxCoinflipBet];$default[$option[amount];$message[0]]]]

    $c[Heads unless tails is chosen]
    $arrayLoad[sides; ;Tails Heads]
    $let[side;$jsonGet[sides;$if[$isOneOf[$toLowerCase[$default[$option[side];$message[1]]];tail;tails;t];0;1]]]

    $defer

    $let[caughtSide;$arraySample[sides]]

    $addTextDisplay[$tl[ui.coinflip.bet.$get[l];$get[side]]]
    $let[msg;$send]

    $subCash[$get[amount]]
    $saveProfile[$env[userProfile]]

    $wait[3s]

    $if[$get[caughtSide]==$get[side];
      $let[winAmount;$math[$get[amount] * 2]]
      $let[result;$tl[ui.coinflip.won.$get[l];$get[caughtSide];$separate[$get[winAmount]]]]

      $c[The profile is read again: it could have changed while the coin was in the air]
      $jsonLoad[userProfile;$getProfile]
      $sumCash[$get[winAmount]]
      $saveProfile[$env[userProfile]]
    ;
      $let[result;$tl[ui.coinflip.lost.$get[l];$get[caughtSide];$separate[$get[amount]]]]
    ]

    $!editMessage[$channelID;$get[msg];$addTextDisplay[$get[result]]]
  `
});
//# sourceMappingURL=coinflip.js.map