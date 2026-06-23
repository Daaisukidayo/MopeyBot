export default {
  name: 'lobbyEmbed',
  description: "Adds an embed for the lobby.",
  code: `
    $let[host;$env[lobby;host]]
    $jsonLoad[userProfile;$getProfile[$get[host]]]
    $let[l;$env[userProfile;language]]

    $let[allReady;$checkCondition[$arrayLength[allPlayers]==$arrayLength[ready]]]
    $let[areSomeTeamsEmpty;$not[$arraySome[teams;team;$arrayLength[$env[team;players]]==0]]]
    $let[disableStart;$not[$and[$get[allReady];$arrayLength[allPlayers]>1;$get[areSomeTeamsEmpty]]]]

    $fn[showReady;
      $if[$arrayLength[partsInTeam]!=0;
        $arrayMap[partsInTeam;userId;
          $return[$if[$arrayIncludes[ready;$env[userId]];🟢;🔴]$username[$env[userId]]]
        ;readyPlayers]
      ;
        $arrayLoad[readyPlayers; ;$tl[ui.lobby.none.$get[l]]]
      ]
    ]

    $addContainer[
      $addSection[
        $addTextDisplay[$tl[ui.lobby.author.$get[l];$username[$get[host]]]]
        $addThumbnail[$userAvatar[$get[host]]]
      ]
      
      $if[$arrayLength[teams]==1;

        $jsonLoad[partsInTeam;$env[teams;0;players]]
        $callFn[showReady]

        $addSeparator
        $addTextDisplay[$tl[ui.lobby.participantsTitle.$get[l]]]
        $addTextDisplay[**$codeBlock[$arrayJoin[readyPlayers;\n]]**]
        $addActionRow
        $addButton[joinLobby-0;$tl[ui.lobby.buttonLabelJoin.$get[l]];Success;🔝]
        $addButton[quitLobby-0;$tl[ui.lobby.buttonLabelQuit.$get[l]];Danger;🔙]

      ;

        $loop[$arrayLength[teams];
          $let[i;$math[$env[i] - 1]]
          $jsonLoad[partsInTeam;$env[teams;$get[i];players]]
          $callFn[showReady]

          $addSeparator
          $addTextDisplay[$tl[ui.lobby.teamTitle.$get[l];$env[i]]]
          $addTextDisplay[**$codeBlock[$arrayJoin[readyPlayers;\n]]**]
          $addActionRow
          $addButton[joinLobby-$get[i];$tl[ui.lobby.buttonLabelJoin.$get[l]];Success;🔝]
          $addButton[quitLobby-$get[i];$tl[ui.lobby.buttonLabelQuit.$get[l]];Danger;🔙]
        ;i;true]
      ]

      $addSeparator[Large]

      $addActionRow
      $addButton[participantReady;$tl[ui.lobby.buttonLabelReady.$get[l]];Success;✅]

      $addSeparator[Large]

      $addTextDisplay[$tl[ui.lobby.settingsTitle.$get[l]]]
      $addActionRow
      $addButton[showLobbySettings;$tl[ui.lobby.buttonLabelSettings.$get[l]];Success;⚙️]

      $addSeparator

      $addActionRow
      $addButton[startLobby;$tl[ui.lobby.buttonLabelStart.$get[l]];Success;✔️;$get[disableStart]]
      $addButton[closeLobby-manually;$tl[ui.lobby.buttonLabelClose.$get[l]];Danger;🔚]
    ;$getGlobalVar[luckyColor]]
  `
}