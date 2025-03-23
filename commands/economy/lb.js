const cdtime = 120

module.exports = [{
  name: "leaderboard",
  aliases: ["lb", "top"],
  type: "messageCreate",
  code: `
    $reply

    $onlyIf[$getGlobalVar[botEnabled]==true]
    $onlyIf[$getUserVar[isBanned]==false]
    $onlyIf[$getUserVar[acceptedRules]==true;$callFunction[rulesSchema;]]
    $onlyIf[$getUserVar[onSlowmode]==false]

    $let[cdTime;${cdtime}]
    $if[$getUserVar[dev]==false;
            $userCooldown[$commandName;$get[cdTime];$callFunction[cooldownSchema;$commandName]]
    ]

    $let[lbmsgID;$sendMessage[$channelID;${embed()} $footer[] $description[Loading...];true]]

    $setMessageVar[page;$message[0];$get[lbmsgID]]
    $setMessageVar[rowsPerPage;$message[1];$get[lbmsgID]]

    $if[$or[$getMessageVar[page;$get[lbmsgID]]==;$isNumber[$getMessageVar[page;$get[lbmsgID]]]==false;$getMessageVar[page;$get[lbmsgID]]<=0]==true;
            $setMessageVar[page;1;$get[lbmsgID]]
    ]

    $if[$or[$getMessageVar[rowsPerPage;$get[lbmsgID]]==;$isNumber[$getMessageVar[rowsPerPage;$get[lbmsgID]]]==false;$getMessageVar[rowsPerPage;$get[lbmsgID]]<=0]==true;
            $setMessageVar[rowsPerPage;10;$get[lbmsgID]]
    ]
    
    $setMessageVar[pages;$ceil[$getUserLeaderboardLength[MC;$getMessageVar[rowsPerPage;$get[lbmsgID]];true]];$get[lbmsgID]]

    $if[$getMessageVar[page;$get[lbmsgID]]>$getMessageVar[pages;$get[lbmsgID]];
            $setMessageVar[page;$getMessageVar[pages;$get[lbmsgID]];$get[lbmsgID]]
    ]

    ${vars()}

    $if[$getMessageVar[pages;$get[lbmsgID]]>1;

      $setTimeout[ 
          $addActionRow
          $addButton[left-$authorID;;Primary;⬅️;true]
          $addButton[right-$authorID;;Primary;➡️;true] 
          $!editMessage[$channelID;$get[lbmsgID];${embed()} $color[GRAY] This message is now inactive. Run the command again.]
          $deleteMessageVar[page;$get[lbmsgID]]  
          $deleteMessageVar[pages;$get[lbmsgID]]  
          $deleteMessageVar[rowsPerPage;$get[lbmsgID]]  
      ;${cdtime}s]
    ]
  `
}, {
  type: "interactionCreate",
  allowedInteractionTypes: ["button"],
  code: `
    $onlyIf[$or[$customID==left-$authorID;$customID==right-$authorID]==true]

    $let[lbmsgID;$messageID]

    $onlyIf[$getMessageVar[page;$get[lbmsgID]]!=]
    $onlyIf[$getMessageVar[pages;$get[lbmsgID]]!=]
    $onlyIf[$getMessageVar[rowsPerPage;$get[lbmsgID]]!=]

    $if[$customID==left-$authorID;

      $setMessageVar[page;$sub[$getMessageVar[page];1]]

      $if[$getMessageVar[page]==0;
        $setMessageVar[page;$getMessageVar[pages]]
      ]

    ;$if[$customID==right-$authorID;

      $setMessageVar[page;$sum[$getMessageVar[page];1]]

      $if[$getMessageVar[page]>$getMessageVar[pages];
        $setMessageVar[page;1]
      ]
    ]]

    ${vars()}

    $deferUpdate
  `
}];

function vars() {
  return `
    $let[i;0]
    $let[lb;$userLeaderboard[MC;asc;$getMessageVar[rowsPerPage;$get[lbmsgID]];$getMessageVar[page;$get[lbmsgID]];\n;data;pos;
      $let[emoji;$if[$env[pos]==1;🥇;$if[$env[pos]==2;🥈;$if[$env[pos]==3;🥉;⁘]]]]
      $let[i;$math[$get[i] + 1]]
      $return[$get[emoji] $ordinal[$env[pos]] ➤ $userDisplayName[$env[data;id]]
          $getGlobalVar[blank] Coins: \`$separateNumber[$getUserVar[MC;$env[data;id]];.]\`$getGlobalVar[emoji]
          $getGlobalVar[blank] MUID: \`$getUserVar[MUID;$env[data;id]]\`
      ]
    ]]

    $if[$get[lb]==;
            $let[lb;There is no one on this page!]
    ]

    $if[$getMessageVar[pages;$get[lbmsgID]]>1;
      $addActionRow
      $addButton[left-$authorID;;Primary;⬅️]
      $addButton[right-$authorID;;Primary;➡️]
    ]

    $!editMessage[$channelID;$get[lbmsgID];${embed()}]
  `
}

function embed() {
  return `
        $let[userPos;$getUserLeaderboardValue[MC;asc;$authorID]]
        $let[emoji;$if[$get[userPos]==1;🥇;$if[$get[userPos]==2;🥈;$if[$get[userPos]==3;🥉;⁘]]]]

        $description[$get[lb]$if[$and[$getMessageVar[rowsPerPage;$get[lbmsgID]]>=5;$get[userPos]!=0;$get[userPos]>$get[i]];
        ⋘══════ ∘◦❁◦∘ ══════⋙
        
        **$get[emoji] $ordinal[$get[userPos]] ➤ $userDisplayName\n$getGlobalVar[blank] Coins: \`$separateNumber[$getUserVar[MC];.]\`$getGlobalVar[emoji]\n$getGlobalVar[blank] MUID: \`$getUserVar[MUID]\`**]]

        $footer[Page: $getMessageVar[page;$get[lbmsgID]]/$getMessageVar[pages;$get[lbmsgID]]]
        $color[$getGlobalVar[defaultColor]]
        $author[🔝 Leaderboard]
        $thumbnail[https://cdn.discordapp.com/attachments/701793335941136464/1326901475464450100/Remove-bg.ai_1736428344912.png]
    `
}
