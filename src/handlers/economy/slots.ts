export default {
  name: 'handleSlots',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $let[maximum;$getGlobalVar[maxSlotsBet]]
    $let[defaultAmount;$getGlobalVar[defaultSlotsBet]]
    $let[MC;$env[userProfile;MC]]

    $let[amount;$default[$option[amount];$message[0]]]
    $let[amount;$advancedReplace[$toLowercase[$get[amount]];all;$get[maximum]]]
    $let[amount;$if[$isNumber[$get[amount]];$round[$get[amount]];$get[defaultAmount]]]
    $if[$get[amount]>$get[MC];
      $let[amount;$get[MC]]
    ]

    $let[balance;$tl[ui.slots.balance.$get[l];$separate[$get[MC]]]]

    $onlyif[$get[MC]>=$get[defaultAmount];
      $newError[$tl[ui.slots.invalidCashLow.$get[l];$get[defaultAmount]] $get[balance]]
    ]
    $onlyif[$get[amount]<=$get[MC];
      $newError[$tl[ui.slots.invalidCashHigh.$get[l]] $get[balance]]
    ]
    $onlyif[$inRange[$get[amount];$get[defaultAmount];$get[maximum]];
      $newError[$tl[ui.slots.invalidRange.$get[l];$get[defaultAmount];$separate[$get[maximum]]]]
    ]

    $defer

    $fn[content;
      $return[$trim[$trimLines[
        ‎ $tl[ui.slots.title.$get[l]]
        \` \` $get[slot1]|$get[slot2]|$get[slot3] \` \` $tl[ui.slots.bet.$get[l];$userDisplayName;$separate[$get[amount]]] $get[outputContent]
        ‎  \`|         |\`
        ‎  \`|         |\`
      ]]]
    ]

    $arrayLoad[emojis;,;<:WatermelonS2:1417213697738281091>,<:MelonS1:1417945198335623219>,$getGlobalVar[mopecoin],<:gem:1417945445916999842>]
    
    $let[slot1;⬜]
    $let[slot2;⬜]
    $let[slot3;⬜]

    $arrayCreate[output;3]
    $arrayMap[output;o;
      $return[$arrayRandomValue[emojis]]
    ;output]

    $let[won;$arrayEvery[output;elem;$return[$checkCondition[$env[output;0]==$env[elem]]]]]

    $subCash[$get[amount]]
    $saveProfile[$env[userProfile]]

    $c[=======================]

    $addTextDisplay[$callFn[content]]
    $let[msgid;$send]

    $wait[2000]

    $let[slot1;$env[output;0]]
    $!editMessage[$channelID;$get[msgid];$addTextDisplay[$callFn[content]]]

    $wait[1000]

    $let[slot2;$env[output;1]]
    $!editMessage[$channelID;$get[msgid];$addTextDisplay[$callFn[content]]]

    $wait[1000]

    $let[slot3;$env[output;2]]

    $if[$get[won];

      $let[mlt;$function[
        $return[$switch[$env[output;0];
          $case[$env[emojis;0];2]
          $case[$env[emojis;1];4]
          $case[$env[emojis;2];8]
          $case[$env[emojis;3];20]
        ]]
      ]]

      $let[winAmount;$math[$get[amount] * $get[mlt]]]
      $let[outputContent;$tl[ui.slots.won.$get[l];$separate[$get[winAmount]]]]

      $jsonLoad[userProfile;$getProfile]
      $sumCash[$get[winAmount]]
      $saveProfile[$env[userProfile]]

    ;
      $let[outputContent;$tl[ui.slots.lost.$get[l]]]
    ]

    $!editMessage[$channelID;$get[msgid];$addTextDisplay[$callFn[content]]]
  `
}