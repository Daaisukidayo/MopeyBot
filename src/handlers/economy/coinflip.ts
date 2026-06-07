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

    $let[balance;$tl[$get[l];ui;coinflip.balance;$separate[$get[MC]]]]

    $onlyif[$get[MC]>=$get[defaultAmount];
      $newError[$tl[$get[l];ui;coinflip.invalidCashLow;$get[defaultAmount]] $get[balance]]
    ]
    $onlyif[$get[amount]<=$get[MC];
      $newError[$tl[$get[l];ui;coinflip.invalidCashHigh] $get[balance]]
    ]
    $onlyif[$inRange[$get[amount];$get[defaultAmount];$get[maximum]];
      $newError[$tl[$get[l];ui;coinflip.invalidRange;$get[defaultAmount];$separate[$get[maximum]]]]
    ]

    $defer

    $let[caughtSide;$arrayRandomValue[sides]]


    $addTextDisplay[$tl[$get[l];ui;coinflip.bet;$get[side]]]
    $let[msg;$send]

    $subCash[$get[amount]]
    $saveProfile

    $wait[3s]

    $if[$get[caughtSide]==$get[side];
      $let[winAmount;$math[$get[amount] * 2]]

      $!editMessage[$channelID;$get[msg];
        $addTextDisplay[$tl[$get[l];ui;coinflip.won;$get[caughtSide];$separate[$get[winAmount]]]]
      ]

      $jsonLoad[userProfile;$getProfile]
      $sumCash[$get[winAmount]]
      $saveProfile

    ;
      $!editMessage[$channelID;$get[msg];
        $addTextDisplay[$tl[$get[l];ui;coinflip.lost;$get[caughtSide];$separate[$get[amount]]]]
      ]
    ]
  `
}