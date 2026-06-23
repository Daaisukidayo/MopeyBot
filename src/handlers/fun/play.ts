export default {
  name: 'handlePlay',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile

    $onlyIf[$guildID!=;
      $newError[$tl[ui.play.unableInDm.$get[l]]]
    ]

    $onlyIf[$env[userProfile;devMode]==1;
      $newError[$tl[ui.special.commandDisabled.$get[l]]]
    ]

    $jsonLoad[playData;$getUserVar[userPlayData]]

    $if[$env[playData;started];
      $addContainer[
        $addAuthorDisplay
        $addTextDisplay[$tl[ui.play.activeSession.$get[l]]]
        $addTextDisplay[### $hyperlink[$tl[ui.play.endPreviousGame.$get[l]];https://discord.com/channels/$env[playData;GuildID]/$env[playData;ChannelID]/$env[playData;MessageID]]]
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
        $addUpgradeMenu
        $addSeparator[Large]
        $addExitButton
        $addCheats
      ;$getGlobalVar[defaultColor]]

      $let[mid;$send]

      $!jsonSet[playData;MessageID;"$get[mid]"]
      $!jsonSet[playData;ChannelID;"$channelID"]
      $!jsonSet[playData;GuildID;"$guildID"]
      $!jsonSet[playData;started;true]
      $updatePlayData
    ]
  `
}