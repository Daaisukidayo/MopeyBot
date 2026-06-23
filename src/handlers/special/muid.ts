export default {
  name: 'handleMuid',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $try[
      $let[arg;$abs[$default[$option[muid];$message[0]]]]
    ;
      $newError[$tl[ui.muid.invalidArgument.$get[l]]]
    ]

    $onlyIf[$charCount[$get[arg]]<=5;
      $newError[$tl[ui.muid.largeNumber.$get[l]]]
    ]

    $jsonLoad[allUserIDs;$getGlobalVar[allUserIDs]]

    $loop[$arrayLength[allUserIDs];
      $let[ID;$arrayAt[allUserIDs;$math[$env[i] - 1]]]

      $let[userMUID;$env[$getProfile[$get[ID]];MUID]]

      $if[$get[userMUID]==$get[arg];;$continue]

      $let[userID;$get[ID]]

      $break
    ;i;true]

    $onlyIf[$and[$get[arg]>0;$get[userMUID]!=;$get[userID]!=];
      $newError[$tl[ui.muid.userDoesNotExist.$get[l];$get[arg]]]
    ]

    $addContainer[
      $addSection[
        $addTextDisplay[# \`@$username[$get[userID]]#$get[userMUID]\`]
        $addThumbnail[$userAvatar[$get[userID]]]
      ]
      $addSeparator[Large]
      $addTextDisplay[## \`$separate[$env[$getProfile[$get[userID]];MC]]\`$getGlobalVar[mopecoin]]
      $addTextDisplay[$tl[ui.muid.discordId.$get[l];$get[userID]]]
    ;$getGlobalVar[defaultColor]]
  `
}