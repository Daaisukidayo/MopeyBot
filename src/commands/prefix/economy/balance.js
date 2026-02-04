export default {
  name: "balance",
  aliases: ['bal', 'coins', 'cash', 'profile', 'prof', 'money', 'packs'],
  type: "messageCreate",
  code: ` 
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown[10s]

    $jsonLoad[shopItems;$getGlobalVar[shopItems]]
    $jsonLoad[userPacks;$env[userProfile;userPacks]]

    $if[$arrayLength[userPacks]>0;
      $arrayMap[userPacks;pack;
        $loop[$arrayLength[shopItems];
          $let[i;$math[$env[i]-1]]
          $let[id;$env[shopItems;$get[i];id]]

          $if[$env[pack]==$get[id];;$continue]
          $break
        ;i;true]
        $return[$tl[data.shopSkinPacks.$get[id]]]
      ;packsContent]
    ;
      $arrayLoad[packsContent; ;$tl[ui.$commandName.none]]
    ]

    $let[MC;$separate[$env[userProfile;MC]]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.$commandName.title]]
      $addSeparator[Large]
      $addTextDisplay[$tl[ui.$commandName.mc;$get[MC]]]
      $addTextDisplay[$tl[ui.$commandName.purchased]]
      $addTextDisplay[$codeBlock[$arrayJoin[packsContent;\n]]]
    ;$getGlobalVar[defaultColor]]
  `
}