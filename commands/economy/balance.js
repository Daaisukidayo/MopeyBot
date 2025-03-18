module.exports = [{
  name: "balance",
  aliases: ['bal', 'coins', 'cash', 'profile', 'prof', 'money'],
  type: "messageCreate",
  code: `${coinsBalance()}`
},{
  type: "interactionCreate",
  allowedInteractionTypes: [ "button" ],
  code: `$onlyIf[$customID==coins-$authorID] ${coinsBalance()} $deferUpdate `
},{
  type: "interactionCreate",
  allowedInteractionTypes: [ "button" ],
  code:`

    $onlyIf[$customID==packs-$authorID]
    $onlyIf[$getGlobalVar[botEnabled]==true]
    $onlyIf[$getUserVar[isBanned]==false]
    $onlyIf[$getUserVar[acceptedRules]==true;$callFunction[rulesSchema;]]
    $onlyIf[$getUserVar[onSlowmode]==false]

    $addActionRow
    $addButton[coins-$authorID;Coins;Primary;$getGlobalVar[emoji]]
    $addButton[packs-$authorID;Packs;Primary;🛒;true]

    $async[$wait[1m] $disableButtonsOf[$channelID;$messageID]]

    $jsonLoad[data;$getUserVar[userPacks]]
    
    $let[ct;$env[data;legacySP]]
    $let[ssp;$env[data;summerSP]]
    $let[hsp;$env[data;halloweenSP]]
    $let[gsp;$env[data;goldenSP]]
    $let[lsp;$env[data;lockedSP]]
    $let[lgt;$env[data;landGTSP]]
    $let[dgt;$env[data;desertGTSP]]
    $let[ogt;$env[data;oceanGTSP]]
    $let[agt;$env[data;arcticGTSP]]
    $let[sfsp;$env[data;storefrontSP]]
    $let[and;$and[$get[ssp]==false;$get[hsp]==false;$get[gsp]==false;$get[lsp]==false;$get[sfsp]==false;$get[lgt]==false;$get[lgt]==false;$get[ogt]==false;$get[agt]==false;$get[ct]==false]]

    $!editMessage[$channelID;$messageID;

        $addField[🛒 __Bought packs:__;$if[$get[and];none;\`\`\`$toTitleCase[$if[$get[ssp];Summer skinpack]\n$if[$get[hsp];Halloween skinpack]\n$if[$get[gsp];Golden skinpack]\n$if[$get[lsp];Locked skinpack]\n$if[$get[sfsp];Storefront skinpack]\n$if[$get[ct];Legacy skinpack]\n$if[$get[lgt];Gold trim Land skinpack]\n$if[$get[lgt];Gold trim Desert skinpack]\n$if[$get[ogt];Gold trim Ocean skinpack]\n$if[$get[agt];Gold trim Arctic skinpack]]\`\`\`]]
        $title[__BALANCE__]
        $author[$userDisplayName • MUID: $getUserVar[MUID];$userAvatar]
        $thumbnail[$userAvatar[$authorID]]
        $color[ffd700]
    ]

    $deferUpdate

  `
}]

function coinsBalance() {
    return `

    $onlyIf[$getGlobalVar[botEnabled]==true]
    $onlyIf[$getUserVar[isBanned]==false]
    $onlyIf[$getUserVar[acceptedRules]==true;$callFunction[rulesSchema;]]

    $if[$isButton==false;
      $reply

      $onlyIf[$getUserVar[onSlowmode]==false]

      $let[cdTime;5s]
      $if[$getUserVar[dev]==false; $userCooldown[$commandName;$get[cdTime];$callFunction[cooldownSchema;$commandName]] ]

    ]

    $addActionRow
    $addButton[coins-$authorID;Coins;Primary;$getGlobalVar[emoji];true]
    $addButton[packs-$authorID;Packs;Primary;🛒]
    
    $if[$isButton==false;
      ${sendMessage()}
    ;
      $!editMessage[$channelID;$messageID;${embed()}]
    ]
    $async[$wait[1m] $disableButtonsOf[$channelID;$get[msg]]]
  `
}

function sendMessage() {
    return `$let[msg;$sendMessage[$channelID;${embed()};true]]`
}

function embed() {
  return `$addField[💰 __Coins:__;**\`$separateNumber[$getUserVar[MC];.]\`$getGlobalVar[emoji]**]
    $title[__BALANCE__]
    $author[$userDisplayName • MUID: $getUserVar[MUID];$userAvatar]
    $thumbnail[$userAvatar]
    $color[ffd700]`
}