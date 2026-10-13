"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "handleMuid",
    code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    
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

    $c[Saved profiles are read directly, so no user is looked up in Discord]
    $let[userID;$arrayFind[$getGlobalVar[allUserIDs];ID;$jsonGet[$getUserVar[userProfile;$env[ID]];MUID]==$get[arg]]]

    $onlyIf[$and[$get[arg]>0;$get[userID]!=];
      $newError[$tl[ui.muid.userDoesNotExist.$get[l];$get[arg]]]
    ]

    $addContainer[
      $addSection[
        $addTextDisplay[# \`@$username[$get[userID]]#$get[arg]\`]
        $addThumbnail[$userAvatar[$get[userID]]]
      ]
      $addSeparator[Large]
      $addTextDisplay[## \`$separate[$jsonGet[$getProfile[$get[userID]];MC]]\`$getGlobalVar[mopecoin]]
      $addTextDisplay[$tl[ui.muid.discordId.$get[l];$get[userID]]]
    ;$getGlobalVar[defaultColor]]
  `
});
//# sourceMappingURL=muid.js.map