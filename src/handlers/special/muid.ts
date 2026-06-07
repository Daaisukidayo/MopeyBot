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
      $newError[$tl[$get[l];ui;muid.invalidArgument]]
    ]

    $onlyIf[$charCount[$get[arg]]<=5;
      $newError[$tl[$get[l];ui;muid.largeNumber]]
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
      $newError[$tl[$get[l];ui;muid.userNotExist;$get[arg]]]
    ]

    $addContainer[
      $addSection[
        $addTextDisplay[# \`@$username[$get[userID]]#$get[userMUID]\`]
        $addThumbnail[$userAvatar[$get[userID]]]
      ]
      $addSeparator[Large]
      $addTextDisplay[## \`$separate[$dump[$getProfile[$get[userID]];MC]]\`$getGlobalVar[emoji]]
      $addTextDisplay[$tl[$get[l];ui;muid.discordId;$get[userID]]]
    ;$getGlobalVar[defaultColor]]
  `
}