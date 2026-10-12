import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "handleCreateLobby",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    
    $checkProfile

    $cooldown[lobby-$channelID;1000]
    
    $jsonLoad[lobby;$getChannelVar[lobby]]

    $onlyIf[$env[lobby]==;
      $let[participants;$arrayJoin[$arrayMap[$jsonGet[lobby;allPlayers];ID;$return[$username[$env[ID]]]];\n]]

      $addContainer[
        $addTextDisplay[# ✖️ _$tl[ui.errors.errorTitle.$get[l]]_]
        $addSeparator[Large]
        $addTextDisplay[$tl[ui.lobby.lobbyAlreadyExist.$get[l]]]
        $addSeparator[Large]
        $addTextDisplay[$tl[ui.lobby.participantsTitle.$get[l]]]
        $addTextDisplay[$codeBlock[$default[$get[participants];$tl[ui.lobby.none.$get[l]]]]]
        $addActionRow
        $addButton[closeLobby-forcefully;$tl[ui.lobby.buttonLabelCloseManually.$get[l]];Danger;🔚]
      ;$getGlobalVar[errorColor]]
    ]

    $onlyIf[$getProgress==;
      $newError[$tl[ui.lobby.hasActiveChallengeLobby.$get[l]]]
    ]

    
    $c[A new lobby has one team with its host in it]
    $jsonLoad[team;$getGlobalVar[baseLobbyTeam]]
    $!jsonSet[team;players;$arrayOf["$authorID"]]
    $jsonLoad[lobby;$getGlobalVar[baseLobby]]
    $objectMerge[lobby;$objectOf[host;"$authorID";allPlayers;$arrayOf["$authorID"];teams;$arrayOf[$env[team]]]]
    
    $lobbyEmbed[lobby]

    $let[mid;$send]

    $!jsonSet[lobby;messageID;"$get[mid]"]
    
    $setChannelVar[lobby;$env[lobby]]
    $newLobbyTimeout
  `
})
