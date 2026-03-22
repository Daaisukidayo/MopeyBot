export default {
  name: 'handlePlay',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile

    $onlyIf[$guildID!=;
      $newError[$tl[ui.play.unableInDm]]
    ]

    $onlyIf[false;
      $newError[$tl[ui.special.disabledCommand]]
    ]


    $jsonLoad[userWardrobe;$getUserVar[userWardrobe]]
    $jsonLoad[playData;$getUserVar[userPlayData]]

    $if[$env[playData;started];
      $addContainer[
        $addAuthorDisplay
        $addTextDisplay[$tl[ui.play.activeSession]]
        $addTextDisplay[### $hyperlink[$tl[ui.play.endPreviousGame];https://discord.com/channels/$env[playData;GuildID]/$env[playData;ChannelID]/$env[playData;MessageID]]]
        $addSeparator
        $addActionRow
        $addButton[messagemissing-play-$authorID;$tl[ui.play.buttonLabelCantFind];Danger]
      ;$getGlobalVar[defaultColor]]
      $send
    ;
      $setUserVar[allRareAttemptsInfo;$generateLuck[$getGlobalVar[playRaritiesKey]]]
      
      $addContainer[
        $addAuthorDisplay
        $addTextDisplay[$tl[ui.play.chooseAnimal]]
        $addUpgradeMenu
        $addSeparator[Large]
        $addCheats
        $addExitButton
      ;$getGlobalVar[defaultColor]]

      $let[mid;$function[
        $if[$isPrefixCommand;
          $return[$sendMessage[$channelID;;true]]
        ]
        $return[$interactionReply[;true]]
      ]]

      $!jsonSet[playData;MessageID;"$get[mid]"]
      $!jsonSet[playData;ChannelID;"$channelID"]
      $!jsonSet[playData;GuildID;"$guildID"]
      $!jsonSet[playData;started;true]
      $updatePlayData
    ]
  `
}