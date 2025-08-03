const CD = "30s"

module.exports = [{
  name: "balance",
  aliases: ['bal', 'coins', 'cash', 'profile', 'prof', 'money', 'packs'],
  type: "messageCreate",
  code: ` 
    $reply
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
    $callFunction[cooldown;${CD}]

    $arrayLoad[packs]
    $jsonLoad[allSkinPacks;$getGlobalVar[shopItems]]
    $jsonLoad[userPacks;$env[userProfile;userPacks]]
    $jsonLoad[userPacksKeys;$jsonKeys[userPacks]]

    $if[$arrayAt[userPacksKeys;0]==;
      $arrayPush[packs;none]
    ;
      $arrayForEach[userPacksKeys;userPack;
        $arrayForEach[allSkinPacks;skinpack;
          $if[$env[userPack]==$env[skinpack;name];
            $arrayPush[packs;$env[skinpack;description]]
          ]
        ]
      ]
    ]

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]
      $addTextDisplay[# __BALANCE__]
      $addSeparator[Large]
      $addTextDisplay[## \`$separateNumber[$env[userProfile;MC];,]\`$getGlobalVar[emoji]]
      $addTextDisplay[## 🛒 __Purchased Skinpacks:__\n$codeBlock[$arrayJoin[packs;\n]]]
    ;$getGlobalVar[defaultColor]]
  `
}]