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

    $jsonLoad[allSkinPacks;$getGlobalVar[shopItems]]
    $jsonLoad[userPacks;$getUserVar[userPacks]]
    $jsonLoad[userPacksKeys;$jsonKeys[userPacks]]
    
    $let[desc;]

    $if[$arrayAt[userPacksKeys;0]==;
      $let[desc;none]
    ;
      $arrayForEach[userPacksKeys;userPack;
        $arrayForEach[allSkinPacks;skinpack;
          $if[$env[userPack]==$env[skinpack;name];
            $let[desc;$get[desc]$env[skinpack;description]\n]
          ]
        ]
      ]
    ]


    $!editMessage[$channelID;$messageID;
      $addField[🛒 __Purchased Skinpacks:__;$codeBlock[$get[desc]]]
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
    ;${CD};BAL]
  ` 
}