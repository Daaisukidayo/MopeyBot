import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "handleCoinflip",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $checkProfile
    $addCooldown

    $let[amount;$parseBet[coinflip;5;$getGlobalVar[maxCoinflipBet];$default[$option[amount];$message[0]]]]

    $c[heads by default]
    $arrayLoad[sides; ;Tails Heads]
    $let[side;$jsonGet[sides;$if[$isOneOf[$toLowerCase[$default[$option[side];$message[1]]];tail;tails;t];0;1]]]

    $defer

    $let[caughtSide;$arraySample[sides]]

    $addTextDisplay[$tl[ui.coinflip.bet.$get[l];$get[side]]]
    $let[msg;$send]

    $callMethod[userProfile;takeCoins;$get[amount]]
    $callMethod[userProfile;save]

    $wait[3s]

    $if[$get[caughtSide]==$get[side];
      $let[winAmount;$math[$get[amount] * 2]]
      $let[result;$tl[ui.coinflip.won.$get[l];$get[caughtSide];$separate[$get[winAmount]]]]

      $c[re-read the profile, it might've changed while the coin was flipping]
      $jsonLoad[userProfile;$getProfile]
      $callMethod[userProfile;addCoins;$get[winAmount]]
      $callMethod[userProfile;save]
    ;
      $let[result;$tl[ui.coinflip.lost.$get[l];$get[caughtSide];$separate[$get[amount]]]]
    ]

    $!editMessage[$channelID;$get[msg];$addTextDisplay[$get[result]]]
  `,
})
