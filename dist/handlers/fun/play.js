"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "handlePlay",
    code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    
    $checkProfile

    $onlyIf[$guildID!=;
      $newError[$tl[ui.play.unableInDm.$get[l]]]
    ]

    $c[
      $onlyIf[$isDev;
        $newError[$tl[ui.special.commandDisabled.$get[l]]]
      ]
    ]

    $jsonLoad[playData;$getUserVar[userPlayData]]

    $if[$jsonGet[playData;started];
      $addContainer[
        $addAuthorDisplay
        $addTextDisplay[$tl[ui.play.activeSession.$get[l]]]
        $addTextDisplay[### $hyperlink[$tl[ui.play.endPreviousGame.$get[l]];https://discord.com/channels/$jsonGet[playData;GuildID]/$jsonGet[playData;ChannelID]/$jsonGet[playData;MessageID]]]
        $addSeparator
        $addActionRow
        $addButton[play_leave-disconnect-$authorID;$tl[ui.play.buttonLabelCantFind.$get[l]];Danger]
      ;$getGlobalVar[defaultColor]]
      $!send
    ;
      $setUserVar[allRareAttemptsInfo;$generateLuck[$getGlobalVar[playRaritiesKey]]]
      $jsonLoad[userWardrobe;$getUserVar[userWardrobe]]
      
      $addContainer[
        $addAuthorDisplay
        $addTextDisplay[$tl[ui.play.chooseAnimal.$get[l]]]
        $addUpgradeMenu[playData;userWardrobe]
        $addSeparator[Large]
        $addExitButton[playData]
        $addCheats[playData]
      ;$getGlobalVar[defaultColor]]

      $let[mid;$send]

      $objectMerge[playData;$objectOf[MessageID;"$get[mid]";ChannelID;"$channelID";GuildID;"$guildID";started;true]]
      $updatePlayData[playData]
    ]
  `
});
//# sourceMappingURL=play.js.map