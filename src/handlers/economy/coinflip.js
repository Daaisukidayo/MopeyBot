export default {
  name: 'handleCoinflip',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
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

    $let[balance;$tl[ui.coinflip.balance;$separate[$get[MC]]]]

    $onlyif[$get[MC]>=$get[defaultAmount];
      $newError[$tl[ui.coinflip.invalidCashLow;$get[defaultAmount]] $get[balance]]
    ]
    $onlyif[$get[amount]<=$get[MC];
      $newError[$tl[ui.coinflip.invalidCashHigh] $get[balance]]
    ]
    $onlyif[$inRange[$get[amount];$get[defaultAmount];$get[maximum]];
      $newError[$tl[ui.coinflip.invalidRange;$get[defaultAmount];$separate[$get[maximum]]]]
    ]

    $defer

    $let[caughtSide;$arrayRandomValue[sides]]
    $let[msg;$function[
      $if[$isPrefixCommand;
        $return[$sendMessage[$channelID;$tl[ui.coinflip.bet;$get[side]];true]]
      ]
      $return[$interactionReply[$tl[ui.coinflip.bet;$get[side]];true]]
    ]]

    $subCash[$get[amount]]
    $saveProfile

    $wait[3s]

    $if[$get[caughtSide]==$get[side];
      $let[winAmount;$math[$get[amount] * 2]]

      $!editMessage[$channelID;$get[msg];$tl[ui.coinflip.won;$get[caughtSide];$separate[$get[winAmount]]]]

      $jsonLoad[userProfile;$getProfile]
      $sumCash[$get[winAmount]]
      $saveProfile

    ;
      $!editMessage[$channelID;$get[msg];$tl[ui.coinflip.lost;$get[caughtSide];$separate[$get[amount]]]]
    ]
  `
}