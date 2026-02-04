export default {
  name: 'slots',
  type: 'messageCreate',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown[10s]

    $let[maximum;$getGlobalVar[maxSlotsBet]]
    $let[MC;$env[userProfile;MC]]
    $let[defaultAmount;5]
    $let[amount;$advancedReplace[$toLowercase[$message[0]];all;$get[maximum]]]
    $let[amount;$if[$isNumber[$get[amount]];$round[$get[amount]];$get[defaultAmount]]]
    $if[$get[amount]>$get[MC];
      $let[amount;$get[MC]]]

    $let[balance;$tl[ui.$commandName.balance;$separate[$get[MC]]]]

    $onlyif[$get[MC]>=$get[defaultAmount];
      $newError[$tl[ui.$commandName.invalidCashLow;$get[defaultAmount]] $get[balance]]
    ]
    $onlyif[$get[amount]<=$get[MC];
      $newError[$tl[ui.$commandName.invalidCashHigh] $get[balance]]
    ]
    $onlyif[$inRange[$get[amount];$get[defaultAmount];$get[maximum]];
      $newError[$tl[ui.$commandName.invalidRange;$get[defaultAmount];$separate[$get[maximum]]]]
    ]

    $fn[content;
      $return[$trim[$trimLines[‎ $tl[ui.$commandName.title]
      \` \` $get[slot1]|$get[slot2]|$get[slot3] \` \` $tl[ui.$commandName.bet;$userDisplayName;$separate[$get[amount]]] $get[outputContent]
      ‎  \`|         |\`
      ‎  \`|         |\`
    ]]]]

    $arrayLoad[emojis;,;<:WatermelonS2:1417213697738281091>,<:MelonS1:1417945198335623219>,<:PumpkinPieS2:1417945210154909766>,$getGlobalVar[emoji],<:gem:1417945445916999842>]
    
    $let[slot1;⬜]
    $let[slot2;⬜]
    $let[slot3;⬜]

    $let[won;false]
    $let[attempts;$getUserVar[slotAttempts;$authorID;1]]

    $loop[$max[1;$floor[$math[$get[attempts] / 4]]];
      $arrayLoad[output]
      $loop[3;
        $arrayPush[output;$arrayRandomValue[emojis]]
      ;i;true]

      $let[won;$arrayEvery[output;elem;$return[$checkCondition[$env[output;0]==$env[elem]]]]]
      $if[$get[won];
        $let[attempts;0]
        $break
      ]
    ]

    $letSum[attempts;1]
    $setUserVar[slotAttempts;$get[attempts]]

    $let[outputContent;]

    $subCash[$get[amount]]
    $saveProfile

    $c[=======================]

    $let[msgid;$sendMessage[$channelID;$callFn[content];true]]

    $wait[2000]

    $let[slot1;$env[output;0]]
    $!editMessage[$channelID;$get[msgid];$callFn[content]]

    $wait[1000]

    $let[slot2;$env[output;1]]
    $!editMessage[$channelID;$get[msgid];$callFn[content]]

    $wait[1000]

    $let[slot3;$env[output;2]]

    $if[$get[won];

      $let[mlt;$function[
        $return[$switch[$env[output;0];
          $case[$env[emojis;0];2]
          $case[$env[emojis;1];3]
          $case[$env[emojis;2];4]
          $case[$env[emojis;3];5]
          $case[$env[emojis;4];10]
        ]]
      ]]

      $let[winAmount;$math[$get[amount] * $get[mlt]]]
      $let[outputContent;$tl[ui.$commandName.won;$separate[$get[winAmount]]]]

      $jsonLoad[userProfile;$getProfile]
      $sumCash[$get[winAmount]]
      $saveProfile

    ;
      $let[outputContent;$tl[ui.$commandName.lost]]
    ]

    $!editMessage[$channelID;$get[msgid];$callFn[content]]
  `
}