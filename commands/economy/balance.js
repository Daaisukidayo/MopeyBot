const CD = "10s"

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
    $jsonLoad[shopItems;$getGlobalVar[shopItems]]
    $jsonLoad[userPacks;$env[userProfile;userPacks]]

    $if[$arrayAt[userPacks;0]!=;
      $arrayForEach[userPacks;userPack;
        $loop[$arrayLength[shopItems];
          $jsonLoad[item;$arrayAt[shopItems;$sub[$env[i];1]]]
          $if[$env[userPack]==$env[item;code];;$continue]
          $arrayPush[packs;$env[item;name]]
          $break
        ;i;true]
      ]
    ;
      $arrayPush[packs;none]
    ]

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]
      $addTextDisplay[# __BALANCE__]
      $addSeparator[Large]
      $addTextDisplay[## $getGlobalVar[emoji] Balance: \`$separateNumber[$env[userProfile;MC];,]\`]
      $addTextDisplay[## 🛒 __Purchased Skinpacks:__\n$codeBlock[$arrayJoin[packs;\n]]]
    ;$getGlobalVar[defaultColor]]
  `
}]