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

        $addField[🛒 __Bought packs:__;$if[$get[and]==true;none;
        \`\`\`$toTitleCase[
        $if[$get[ssp]==true;Summer skinpack]
        $if[$get[hsp]==true;Halloween skinpack]
        $if[$get[gsp]==true;Golden skinpack]
        $if[$get[lsp]==true;Locked skinpack]
        $if[$get[sfsp]==true;Storefront skinpack]
        $if[$get[ct]==true;Legacy skinpack]
        $if[$get[lgt]==true;Gold trim Land skinpack]
        $if[$get[lgt]==true;Gold trim Desert skinpack]
        $if[$get[ogt]==true;Gold trim Ocean skinpack]
        $if[$get[agt]==true;Gold trim Arctic skinpack]]\`\`\`]]

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
      $userCooldown[$commandName;$get[cdTime];$callFunction[cooldownSchema;$commandName]]
    ]

    $addActionRow
    $addButton[coins-$authorID;Coins;Primary;$getGlobalVar[emoji];true]
    $addButton[packs-$authorID;Packs;Primary;🛒]
    
    $if[$isButton==false;
      ${embed()}
    ;
      $!editMessage[$channelID;$messageID;${onlyEmbed()}]
    ]
    $async[$wait[1m] $disableButtonsOf[$channelID;$get[msg]]]
  `
}

function embed() {
    return `$let[msg;$sendMessage[$channelID;${onlyEmbed()};true]]`
}

function onlyEmbed() {
  return `$addField[💰 __Coins:__;**\`$separateNumber[$getUserVar[MC];.]\`$getGlobalVar[emoji]**]
    $title[__BALANCE__]
    $author[$userDisplayName • MUID: $getUserVar[MUID];$userAvatar]
    $thumbnail[$userAvatar]
    $color[ffd700]`
}