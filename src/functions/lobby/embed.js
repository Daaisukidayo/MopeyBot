export default {
  name: 'lobbyEmbed',
  description: "Adds an embed for the lobby.",
  code: `
    $jsonLoad[userProfile;$getProfile[$env[lobby;host]]]

    $let[allRdy;$checkCondition[$arrayLength[allPlayers]==$arrayLength[ready]]]
    $let[areSomeTeamsEmpty;$arraySome[teams;team;$advArrayLength[$env[team;players]]==0]]
    $let[noEmptyTeam;$checkCondition[$get[areSomeTeamsEmpty]==false]]
    $let[disableStart;$checkCondition[$and[$get[allRdy];$arrayLength[allPlayers]>1;$get[noEmptyTeam]]==false]]

    $fn[showReady;
      $if[$arrayLength[partsInTeam]!=0;
        $arrayMap[partsInTeam;ID;
          $return[$if[$arrayIncludes[ready;$env[ID]];🟢;🔴]$username[$env[ID]]]
        ;readyPlayers]
      ;
        $arrayLoad[readyPlayers; ;$tl[ui.lobby.none]]
      ]
    ]

    $addContainer[
      $addSection[
        $addTextDisplay[$tl[ui.lobby.author;$username[$env[lobby;host]]]]
        $addThumbnail[$userAvatar[$env[lobby;host]]]
      ]
      
      $if[$arrayLength[teams]==1;

        $jsonLoad[partsInTeam;$env[teams;0;players]]
        $callFn[showReady]

        $addSeparator
        $addTextDisplay[$tl[ui.lobby.participantsTitle]]
        $addTextDisplay[**$codeBlock[$arrayJoin[readyPlayers;\n]]**]
        $addActionRow
        $addButton[joinLobby-0;$tl[ui.lobby.buttonLabelJoin];Success;🔝]
        $addButton[quitLobby-0;$tl[ui.lobby.buttonLabelQuit];Danger;🔙]

      ;

        $loop[$arrayLength[teams];
          $let[i;$math[$env[i] - 1]]
          $jsonLoad[partsInTeam;$env[teams;$get[i];players]]
          $callFn[showReady]

          $addSeparator
          $addTextDisplay[$tl[ui.lobby.teamTitle;$env[i]]]
          $addTextDisplay[**$codeBlock[$arrayJoin[readyPlayers;\n]]**]
          $addActionRow
          $addButton[joinLobby-$get[i];$tl[ui.lobby.buttonLabelJoin];Success;🔝]
          $addButton[quitLobby-$get[i];$tl[ui.lobby.buttonLabelQuit];Danger;🔙]
        ;i;true]
      ]

      $addSeparator[Large]

      $addActionRow
      $addButton[readyLobby;$tl[ui.lobby.buttonLabelReady];Success;✅]

      $addSeparator[Large]

      $addTextDisplay[$tl[ui.lobby.settingsTitle]]
      $addActionRow
      $addButton[showLobbySettings;$tl[ui.lobby.buttonLabelSettings];Success;⚙️]

      $addSeparator

      $addActionRow
      $addButton[startLobby;$tl[ui.lobby.buttonLabelStart];Success;✔️;$get[disableStart]]
      $addButton[endLobby;$tl[ui.lobby.buttonLabelClose];Danger;🔚]
    ;$getGlobalVar[luckyColor]]
  `
}