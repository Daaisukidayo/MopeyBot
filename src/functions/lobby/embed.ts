export default {
  name: 'lobbyEmbed',
  description: "Adds an embed for the lobby.",
  code: `
    $let[host;$env[lobby;host]]
    $jsonLoad[userProfile;$getProfile[$get[host]]]
    $let[l;$env[userProfile;language]]

    $getCache[usernames;usernames]

    $let[allReady;$checkCondition[$arrayLength[allPlayers]==$arrayLength[ready]]]
    $let[areSomeTeamsEmpty;$not[$arraySome[teams;team;$arrayLength[$env[team;players]]==0]]]
    $let[disableStart;$not[$and[$get[allReady];$arrayLength[allPlayers]>1;$get[areSomeTeamsEmpty]]]]

    $fn[showReady;
      $if[$arrayLength[partsInTeam]!=0;
        $arrayMap[partsInTeam;userId;
          $return[$if[$arrayIncludes[ready;$env[userId]];🟢;🔴]$env[usernames;$env[userId]]]
        ;readyPlayers]
      ;
        $arrayLoad[readyPlayers; ;$tl[$get[l];ui;lobby.none]]
      ]
    ]

    $addContainer[
      $addSection[
        $addTextDisplay[$tl[$get[l];ui;lobby.author;$env[usernames;$get[host]]]]
        $addThumbnail[$userAvatar[$get[host]]]
      ]
      
      $if[$arrayLength[teams]==1;

        $jsonLoad[partsInTeam;$env[teams;0;players]]
        $callFn[showReady]

        $addSeparator
        $addTextDisplay[$tl[$get[l];ui;lobby.participantsTitle]]
        $addTextDisplay[**$codeBlock[$arrayJoin[readyPlayers;\n]]**]
        $addActionRow
        $addButton[joinLobby-0;$tl[$get[l];ui;lobby.buttonLabelJoin];Success;🔝]
        $addButton[quitLobby-0;$tl[$get[l];ui;lobby.buttonLabelQuit];Danger;🔙]

      ;

        $loop[$arrayLength[teams];
          $let[i;$math[$env[i] - 1]]
          $jsonLoad[partsInTeam;$env[teams;$get[i];players]]
          $callFn[showReady]

          $addSeparator
          $addTextDisplay[$tl[$get[l];ui;lobby.teamTitle;$env[i]]]
          $addTextDisplay[**$codeBlock[$arrayJoin[readyPlayers;\n]]**]
          $addActionRow
          $addButton[joinLobby-$get[i];$tl[$get[l];ui;lobby.buttonLabelJoin];Success;🔝]
          $addButton[quitLobby-$get[i];$tl[$get[l];ui;lobby.buttonLabelQuit];Danger;🔙]
        ;i;true]
      ]

      $addSeparator[Large]

      $addActionRow
      $addButton[participantReady;$tl[$get[l];ui;lobby.buttonLabelReady];Success;✅]

      $addSeparator[Large]

      $addTextDisplay[$tl[$get[l];ui;lobby.settingsTitle]]
      $addActionRow
      $addButton[showLobbySettings;$tl[$get[l];ui;lobby.buttonLabelSettings];Success;⚙️]

      $addSeparator

      $addActionRow
      $addButton[startLobby;$tl[$get[l];ui;lobby.buttonLabelStart];Success;✔️;$get[disableStart]]
      $addButton[closeLobby-manually;$tl[$get[l];ui;lobby.buttonLabelClose];Danger;🔚]
    ;$getGlobalVar[luckyColor]]
  `
}