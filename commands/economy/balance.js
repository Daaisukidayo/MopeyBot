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

    $!stopTimeout[BAL]

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
    $let[and;$or[$get[ssp];$get[hsp];$get[gsp];$get[lsp];$get[sfsp];$get[lgt];$get[lgt];$get[ogt];$get[agt];$get[ct]]]

    $!editMessage[$channelID;$messageID;
      $addField[🛒 __Purchased Skinpacks:__;$if[$get[and]==false;none;\`\`\`$if[$get[ssp];Summer Skinpack\n]$if[$get[hsp];Halloween Skinpack\n]$if[$get[gsp];Golden Skinpack\n]$if[$get[lsp];Locked Skinpack\n]$if[$get[sfsp];Storefront Skinpack\n]$if[$get[ct];Legacy Skinpack\n]$if[$get[lgt];Land Gold-Trim Skinpack\n]$if[$get[lgt];Desert Gold-Trim Skinpack\n]$if[$get[ogt];Ocean Gold-Trim Skinpack\n]$if[$get[agt];Arctic Gold-Trim Skinpack]\`\`\`]]
      $title[__BALANCE__]
      $getGlobalVar[author]
      $thumbnail[$userAvatar[$authorID]]
      $color[ffd700]
    ]

    $!stopTimeout[BAL]

    ${timeout()}

    $deferUpdate
  `
}]

function coinsBalance() {
  return `

    $addActionRow
    $addButton[coins-$authorID;Coins;Primary;$getGlobalVar[emoji];true]
    $addButton[packs-$authorID;Packs;Primary;🛒]
    
    $if[$isButton!=true;
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