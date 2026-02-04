export default {
  name: "muid",
  aliases: ["uid", "id"],
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown[5s]

    $try[
      $let[arg;$abs[$message[0]]]
    ;
      $newError[$tl[ui.muid.invalidArgument]]
    ]

    $onlyIf[$charCount[$get[arg]]<=5;
      $newError[$tl[ui.muid.largeNumber]]
    ]

    $jsonLoad[allUserIDs;$getGlobalVar[allUserIDs]]

    $loop[$arrayLength[allUserIDs];
      $let[ID;$arrayAt[allUserIDs;$math[$env[i] - 1]]]

      $let[userMUID;$dump[$getProfile[$get[ID]];MUID]]

      $if[$get[userMUID]==$get[arg];;$continue]

      $let[userID;$get[ID]]

      $break
    ;i;true]

    $onlyIf[$and[$get[arg]>0;$get[userMUID]!=;$get[userID]!=];
      $newError[$tl[ui.muid.userNotExist;$get[arg]]]
    ]

    $addContainer[
      $addSection[
        $addTextDisplay[# \`@$username[$get[userID]]#$get[userMUID]\`]
        $addThumbnail[$userAvatar[$get[userID]]]
      ]
      $addSeparator[Large]
      $addTextDisplay[## \`$separate[$dump[$getProfile[$get[userID]];MC]]\`$getGlobalVar[emoji]]
      $addTextDisplay[$tl[ui.muid.discordId;$get[userID]]]
    ;$getGlobalVar[defaultColor]]
  `
}