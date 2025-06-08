const CD = "1m"

module.exports = [{
  name: "leaderboard",
  aliases: ["lb", "top"],
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking;]
    $callFunction[cooldown;${CD}]

    $let[lbmsgID;$sendMessage[$channelID;${embed()};true]]
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
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["button"],
  code: `
    $textSplit[$customID;-]

    $onlyIf[$splitText[1]==$authorID; $callFunction[notYourBTN;] ]
    $onlyIf[$or[$splitText[0]==left_lb;$splitText[0]==right_lb]]

    $let[lbmsgID;$messageID]

    $jsonLoad[userProfile;$getUserVar[userProfile]]

    $onlyIf[$or[$getMessageVar[page;$get[lbmsgID]]!=;$getMessageVar[pages;$get[lbmsgID]]!=;$getMessageVar[rowsPerPage;$get[lbmsgID]]!=];
      $callFunction[interFail;]
    ]

    $if[$splitText[0]==left_lb;

      $setMessageVar[page;$sub[$getMessageVar[page;$get[lbmsgID]];1];$get[lbmsgID]]

      $if[$getMessageVar[page]==0;
        $setMessageVar[page;$getMessageVar[pages;$get[lbmsgID]];$get[lbmsgID]]
      ]

    ;

      $setMessageVar[page;$sum[$getMessageVar[page;$get[lbmsgID]];1];$get[lbmsgID]]

      $if[$getMessageVar[page;$get[lbmsgID]]>$getMessageVar[pages;$get[lbmsgID]];
        $setMessageVar[page;1;$get[lbmsgID]]
      ]
    ]

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
      $return[$get[emoji] $ordinal[$env[pos]] ➤ $userDisplayName[$env[data;id]]\n$getGlobalVar[blank] Coins: \`$separateNumber[$getUserVar[MC;$env[data;id]];.]\`$getGlobalVar[emoji]\n$getGlobalVar[blank] MUID: \`$getUserVar[MUID;$env[data;id]]\`\n]
    ]]

    $if[$get[lb]==;
            $let[lb;There is no one on this page!]
    ]

    $!stopTimeout[LB-$authorID]
    $!stopTimeout[LBV-$authorID]

    $if[$getMessageVar[pages;$get[lbmsgID]]>1;
      ${buttons()}
      ${timeout()}
    ]

    ${timeoutV()}

    $!editMessage[$channelID;$get[lbmsgID];${lbgen()}]

    
  `
}

function embed() {
  return `
    $description[Loading...]
    $color[$getGlobalVar[defaultColor]]
    $author[🔝 Leaderboard]
    $thumbnail[https://cdn.discordapp.com/attachments/701793335941136464/1326901475464450100/Remove-bg.ai_1736428344912.png]
  `
}

function lbgen() {
  return `
    ${embed()}
    $let[userPos;$getUserLeaderboardValue[MC;asc;$authorID]]
    $let[emoji;$if[$get[userPos]==1;🥇;$if[$get[userPos]==2;🥈;$if[$get[userPos]==3;🥉;⁘]]]]

    $description[$get[lb]$if[$and[$getMessageVar[rowsPerPage;$get[lbmsgID]]>=5;$get[userPos]!=0;$get[userPos]>$get[i]];
    ⋘══════ ∘◦❁◦∘ ══════⋙
    
    **$get[emoji] $ordinal[$get[userPos]] ➤ $userDisplayName\n$getGlobalVar[blank] Coins: \`$separateNumber[$getUserVar[MC];.]\`$getGlobalVar[emoji]\n$getGlobalVar[blank] MUID: \`$getUserVar[MUID]\`**]]

    $footer[Page: $getMessageVar[page;$get[lbmsgID]]/$getMessageVar[pages;$get[lbmsgID]]]
  `
}

function buttons(disabled = false) {
return `
$addActionRow
$addButton[left_lb-$authorID;;Primary;⬅️;${disabled}]
$addButton[right_lb-$authorID;;Primary;➡️;${disabled}] `
}


function timeout() {
return `
$setTimeout[ 
  ${buttons(true)}
  $!editMessage[$channelID;$get[lbmsgID];${lbgen()} $color[GRAY] This message is now inactive. Run the command again.] 
;${CD};LB-$authorID]
`}

function timeoutV() {
return `
$setTimeout[
  $deleteMessageVar[page;$get[lbmsgID]]  
  $deleteMessageVar[pages;$get[lbmsgID]]  
  $deleteMessageVar[rowsPerPage;$get[lbmsgID]]  
;${CD}1s;LBV-$authorID]`
}