export default {
  name: 'handleCoinflip',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $let[defaultAmount;5]
    $let[MC;$env[userProfile;MC]]
    $let[maximum;$getGlobalVar[maxCoinflipBet]]

    $let[amount;$advancedReplace[$toLowercase[$default[$option[amount];$message[0]]];all;$get[maximum]]]
    $let[amount;$if[$isNumber[$get[amount]];$round[$get[amount]];$get[defaultAmount]]]
    $if[$get[amount]>$get[MC];
      $let[amount;$get[MC]]
    ]
    $let[side;$toLowercase[$default[$option[side];$message[1]]]]

    $arrayLoad[sides; ;Tails Heads]

    $let[side;$function[
      $if[$includes['$get[side]';'';'h';'heads';'head'];
        $return[$arrayAt[sides;1]]
      ;$if[$includes['$get[side]';'tail','tails';'t'];
        $return[$arrayAt[sides;0]]
      ;
        $return[$arrayAt[sides;1]]
      ]]
    ]]

    $let[balance;$tl[ui.coinflip.balance.$get[l];$separate[$get[MC]]]]

    $onlyif[$get[MC]>=$get[defaultAmount];
      $newError[$tl[ui.coinflip.invalidCashLow.$get[l];$get[defaultAmount]] $get[balance]]
    ]
    $onlyif[$get[amount]<=$get[MC];
      $newError[$tl[ui.coinflip.invalidCashHigh.$get[l]] $get[balance]]
    ]
    $onlyif[$inRange[$get[amount];$get[defaultAmount];$get[maximum]];
      $newError[$tl[ui.coinflip.invalidRange.$get[l];$get[defaultAmount];$separate[$get[maximum]]]]
    ]

    $defer

    $let[caughtSide;$arrayRandomValue[sides]]


    $addTextDisplay[$tl[ui.coinflip.bet.$get[l];$get[side]]]
    $let[msg;$send]

    $subCash[$get[amount]]
    $saveProfile[$env[userProfile]]

    $wait[3s]

    $if[$get[caughtSide]==$get[side];
      $let[winAmount;$math[$get[amount] * 2]]

      $!editMessage[$channelID;$get[msg];
        $addTextDisplay[$tl[ui.coinflip.won.$get[l];$get[caughtSide];$separate[$get[winAmount]]]]
      ]

      $jsonLoad[userProfile;$getProfile]
      $sumCash[$get[winAmount]]
      $saveProfile[$env[userProfile]]

    ;
      $!editMessage[$channelID;$get[msg];
        $addTextDisplay[$tl[ui.coinflip.lost.$get[l];$get[caughtSide];$separate[$get[amount]]]]
      ]
    ]
  `
}