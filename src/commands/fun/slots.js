import uniSnippets from "#snippets/universalSnippets.js";

export default {
  name: 'slots',
  type: 'messageCreate',
  code: `
    $reply
    ${uniSnippets.checkProfile({time: '10s'})}

    $let[maximum;$getGlobalVar[maxSlotsBet]]
    $let[MC;$env[userProfile;MC]]
    $if[$get[MC]<$get[maximum];
      $let[maximum;$get[MC]]
    ]
    $let[defaultAmount;5]
    $let[amount;$default[$advancedReplace[$toLowercase[$message];all;$get[maximum]];$get[defaultAmount]]]

    $onlyif[$isNumber[$get[amount]];
      $callFunction[embed;error]
      $description[
        ## Only number or argument \`all\` is allowed!
        ### Usage: \`$getGuildVar[prefix]$commandName {<amount>|all}\`
      ]
    ]
    $onlyif[$get[MC]>$get[defaultAmount];
      $callFunction[embed;error]
      $description[## You must have at least \`$get[defaultAmount]\`$getGlobalVar[emoji]! Your balance: \`$separateNumber[$get[MC];,]\`$getGlobalVar[emoji]]
    ]
    $onlyif[$get[amount]<=$get[MC];
      $callFunction[embed;error]
      $description[## You don't have that much $getGlobalVar[emoji]! Your balance: \`$separateNumber[$get[MC];,]\`$getGlobalVar[emoji]]
    ]
    $onlyif[$inRange[$get[amount];$get[defaultAmount];$get[maximum]];
      $callFunction[embed;error]
      $description[## You can bet only from \`$get[defaultAmount]\` to \`$separateNumber[$get[maximum];,]\`$getGlobalVar[emoji]!]
    ]

    $let[amount;$floor[$get[amount]]]

    $localFunction[content;$trimLines[
      ‎ **\`•⁕※SLOTS※⁕•\`**
    \` \` $get[slot1]|$get[slot2]|$get[slot3] \` \` $userDisplayName bet \`$separateNumber[$get[amount];,]\`$getGlobalVar[emoji] $get[outputContent]
      ‎  \`|         |\` 
      ‎  \`|         |\`
    ]]

    $arrayLoad[emojis;,;<:WatermelonS2:1417213697738281091>,<:MelonS1:1417945198335623219>,<:PumpkinPieS2:1417945210154909766>,$getGlobalVar[emoji],<:gem:1417945445916999842>]
    $arrayLoad[output]
    $loop[3;$arrayPush[output;$arrayRandomValue[emojis]]]

    $let[won;$arrayEvery[output;elem;$return[$checkCondition[$env[output;0]==$env[elem]]]]]
    $let[outputContent;]
    $let[slot1;⬜]
    $let[slot2;⬜]
    $let[slot3;⬜]

    $callFunction[subMC;$get[amount]]
    $setUserVar[userProfile;$env[userProfile]]

    $c[=======================]

    $let[msgid;$sendMessage[$channelID;$callFn[content];true]]

    $wait[2000]

    $let[slot1;$env[output;0]]
    $!editMessage[$channelID;$get[msgid];$callFn[content]]

    $wait[1500]

    $let[slot2;$env[output;1]]
    $!editMessage[$channelID;$get[msgid];$callFn[content]]

    $wait[1500]

    $if[$get[won];

      $switch[$env[output;0];
        $case[$arrayAt[emojis;0];$let[mlt;2]]
        $case[$arrayAt[emojis;1];$let[mlt;3]]
        $case[$arrayAt[emojis;2];$let[mlt;4]]
        $case[$arrayAt[emojis;3];$let[mlt;5]]
        $case[$arrayAt[emojis;4];$let[mlt;20]]
      ]

      $let[winAmount;$math[$get[amount] * $get[mlt]]]
      $let[outputContent;**and won \`$separateNumber[$get[winAmount];,]\`$getGlobalVar[emoji]!**]
      ${uniSnippets.loadProfile()}
      $callFunction[sumMC;$get[winAmount]]
      $setUserVar[userProfile;$env[userProfile]]

    ;
      $let[outputContent;**and lose..**]
    ]

    $let[slot3;$env[output;2]]
    $!editMessage[$channelID;$get[msgid];$callFn[content]]
  `
}