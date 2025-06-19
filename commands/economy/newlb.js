module.exports = [{
  name: "leaderboard",
  aliases: ["lb", "top"],
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking;]
    $callFunction[cooldown;1m]

    $jsonLoad[allUserIDs;$getGlobalVar[allUserIDs]]
    
    $arrayMap[allUserIDs;id;
      $jsonLoad[userProfile;$getUserVar[userProfile;$env[id]]]
      $return[$env[userProfile]]
    ;profiles]

    $arrayAdvancedSort[profiles;A;B;
      $math[$env[B;MC] - $env[A;MC]]
    ;result]

    $let[rowsPerPage;10]

    $jsonLoad[result;$arraySplice[result;0;$get[rowsPerPage]]]

    $let[position;0]

    $arrayMap[result;res;
      $letSum[position;1]
      $!jsonSet[res;position;$get[position]]
      $return[$env[res]]
    ;result]

    $arrayForEach[result;res;
      $let[emoji;$if[$env[res;position]==1;🥇;$if[$env[res;position]==2;🥈;$if[$env[res;position]==3;🥉;⁘]]]]
      $let[lbplace;$get[lbplace]$get[emoji] $ordinal[$env[res;position]] ➤ $userDisplayName[$env[res;ID]]\n$getGlobalVar[blank] Coins: \`$separateNumber[$env[res;MC];.]\`$getGlobalVar[emoji]\n$getGlobalVar[blank] MUID: \`$env[res;MUID]\`\n\n]
    ]

    $description[**$get[lbplace]**]
    $color[$getGlobalVar[defaultColor]]
    $author[🔝 Leaderboard]
    $thumbnail[https://cdn.discordapp.com/attachments/701793335941136464/1326901475464450100/Remove-bg.ai_1736428344912.png]

  `
}]