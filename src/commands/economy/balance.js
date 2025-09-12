import universalSnippets from '#snippets/universalSnippets.js'

export default {
  name: "balance",
  aliases: ['bal', 'coins', 'cash', 'profile', 'prof', 'money', 'packs'],
  type: "messageCreate",
  code: ` 
    $reply
    ${universalSnippets.checkProfile({time: '10s'})}

    $arrayLoad[packs]
    $jsonLoad[shopItems;$getGlobalVar[shopItems]]
    $jsonLoad[userPacks;$env[userProfile;userPacks]]

    $if[$arrayAt[userPacks;0]!=;
      $arrayForEach[userPacks;userPack;
        $loop[$arrayLength[shopItems];
          $if[$env[userPack]==$env[shopItems;$math[$env[i]-1];code];;$continue]
          $arrayPush[packs;$env[shopItems;$math[$env[i]-1];name]]
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
}