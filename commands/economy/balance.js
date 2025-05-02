const CD = "1m"

module.exports = [{
  name: "balance",
  aliases: ['bal', 'coins', 'cash', 'profile', 'prof', 'money'],
  type: "messageCreate",
  code: ` 
    $reply
    $callFunction[checking;]
    $callFunction[cooldown;${CD}]

    ${coinsBalance()}

    ${timeout()}
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: [ "button" ],
  code: `
    $textSplit[$customID;-]
    $onlyIf[$splitText[1]==$authorID;$callFunction[notYourBTN;]]
    $onlyIf[$splitText[0]==coins]

    ${coinsBalance()} 

    $stopTimeout[BAL]

    ${timeout()}
    
    $deferUpdate
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: [ "button" ],
  code:`
    $textSplit[$customID;-]
    $onlyIf[$splitText[1]==$authorID;$callFunction[notYourBTN;]]
    $onlyIf[$splitText[0]==packs]

    $addActionRow
    $addButton[coins-$authorID;Coins;Primary;$getGlobalVar[emoji]]
    $addButton[packs-$authorID;Packs;Primary;🛒;true]


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

    $stopTimeout[BAL]

    ${timeout()}

    $deferUpdate
  `
}]

function coinsBalance() {
  return `

    $addActionRow
    $addButton[coins-$authorID;Coins;Primary;$getGlobalVar[emoji];true]
    $addButton[packs-$authorID;Packs;Primary;🛒]
    
    $if[$isButton==false;
      ${sendMessage()}
    ;
      $!editMessage[$channelID;$messageID;${embed()}]
    ]
  `
}

function sendMessage() {
  return `$let[msg;$sendMessage[$channelID;${embed()};true]]`
}

function embed() {
  return `
    $addField[💰 __Coins:__;**\`$separateNumber[$getUserVar[MC];.]\`$getGlobalVar[emoji]**]
    $title[__BALANCE__]
    $getGlobalVar[author]
    $thumbnail[$userAvatar]
    $color[ffd700]
  `
}

function timeout() {
return `
$setTimeout[
  $disableButtonsOf[$channelID;$get[msg]]
;${CD};BAL]` 
}