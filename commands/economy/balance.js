const CD = "1m"

module.exports = [{
  name: "balance",
  aliases: ['bal', 'coins', 'cash', 'profile', 'prof', 'money', 'packs'],
  type: "messageCreate",
  code: ` 
    $reply
    ${json()}
    $callFunction[checking]
    $callFunction[cooldown;${CD}]

    $if[$includes[$messageContent;packs];
      ${balEmbed("packs")}
    ;
      ${balEmbed("coins")}
    ]
    
    $let[msgid;$sendMessage[$channelID;;true]]

    ${timeout()}
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: [ "button" ],
  code: `
    ${buttonCheck("coins")}
    ${json()}

    $let[msgid;$messageID]

    ${balEmbed("coins")}
    $!editMessage[$channelID;$get[msgid]]

    $!stopTimeout[BAL-$authorID]
    ${timeout()}
    $deferUpdate
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: [ "button" ],
  code:`
    ${buttonCheck("packs")}
    ${json()}
    
    $let[msgid;$messageID]

    ${balEmbed("packs")}
    $!editMessage[$channelID;$get[msgid]]

    $!stopTimeout[BAL-$authorID]
    ${timeout()}
    $deferUpdate
  `
}]

function userPacks () {
  return `
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
  `
}

function json () {
  return `
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $jsonLoad[allSkinPacks;$getGlobalVar[shopItems]]
    $jsonLoad[userPacks;$env[userProfile;userPacks]]
    $jsonLoad[userPacksKeys;$jsonKeys[userPacks]]
  `
}

function buttonCheck (buttonID) {
  return `
    $arrayLoad[btn;-;$customID]
    $onlyIf[$and[$includes[$env[btn;0];${buttonID}];$includes[$env[btn;1];$authorID]];$callFunction[notYourBTN]]
  `
}

function balEmbed(choice) {
  return `
    $if[${choice === "coins"};
      $addField[💰 __Coins:__;**\`$separateNumber[$env[userProfile;MC];.]\`$getGlobalVar[emoji]**]
    ;
      ${userPacks()}
      $addField[🛒 __Purchased Skinpacks:__;$codeBlock[$get[desc]]]
    ]

    $title[__BALANCE__]
    $getGlobalVar[author]
    $thumbnail[$userAvatar]
    $color[ffd700]

    $addActionRow
    $addButton[coins-$authorID;Coins;Primary;$getGlobalVar[emoji];${choice == "coins"}]
    $addButton[packs-$authorID;Packs;Primary;🛒;${choice == "packs"}]
  `
}


function timeout() {
  return `
    $setTimeout[
      $disableButtonsOf[$channelID;$get[msgid]]
    ;${CD};BAL-$authorID]
  ` 
}