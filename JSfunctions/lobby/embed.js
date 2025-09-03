import settingLobbyVars from './settingVars.js'
export default function lobbyDefaultEmbed(){
  return `
      ${settingLobbyVars()}

      $arrayLoad[allPlayers]
      $arrayMap[teams;team;$return[$env[team;players]];arrayOfPlayers]
      $arrayForEach[arrayOfPlayers;array;$arrayConcat[allPlayers;allPlayers;array]]

      $let[allRdy;$checkCondition[$arrayLength[allPlayers]==$arrayLength[ready]]]
      $arrayMap[teams;team;
        $jsonLoad[players;$env[team;players]]
        $return["$checkCondition[$arrayLength[players]==0]"]
      ;noEmptyTeam]
      $let[noEmptyTeam;$checkCondition[$arrayIncludes[noEmptyTeam;true]==false]]
      $let[disableStart;$checkCondition[$and[$get[allRdy];$arrayLength[allPlayers]>1;$get[noEmptyTeam]]==false]]

      $localFunction[showReady;
        $if[$arrayLength[partsInTeam]!=0;
          $arrayMap[partsInTeam;ID;
            $return[$if[$arrayIncludes[ready;$env[ID]];✅;❌]$username[$env[ID]]]
          ;readyPlayers]
        ;
          $arrayLoad[readyPlayers; ;None]
        ]
      ]

      $addContainer[
        $addSection[
          $addTextDisplay[## $username[$get[host]]'s Lobby]
          $addThumbnail[$userAvatar[$get[host]]]
        ]
        
        $if[$arrayLength[teams]==1;

          $jsonLoad[partsInTeam;$env[teams;0;players]]
          $callFn[showReady]

          $addSeparator
          $addTextDisplay[# 🎮 Participants]
          $addTextDisplay[**$codeBlock[$arrayJoin[readyPlayers;\n]]**]
          $addActionRow
          $addButton[joinLobby-0;Join;Success;🔝]
          $addButton[quitLobby-0;Quit;Danger;🔙]

        ;

          $loop[$arrayLength[teams];
            $let[i;$math[$env[i] - 1]]
            $jsonLoad[partsInTeam;$env[teams;$get[i];players]]
            $callFn[showReady]

            $addSeparator
            $addTextDisplay[# 🎮 Team $env[i]]
            $addTextDisplay[**$codeBlock[$arrayJoin[readyPlayers;\n]]**]
            $addActionRow
            $addButton[joinLobby-$get[i];Join;Success;🔝]
            $addButton[quitLobby-$get[i];Quit;Danger;🔙]
          ;i;true]
        ]

        $addSeparator[Large]

        $addActionRow
        $addButton[readyLobby;Ready;Success;✅]

        $addSeparator[Large]

        $addTextDisplay[# ⚙️ Settings]
        $addActionRow
        $addButton[showLobbySettings;Show Settings;Success;⚙️]

        $addSeparator

        $addActionRow
        $addButton[startLobby-$get[host];Start;Success;✔️;$get[disableStart]]
        $addButton[endLobby-$get[host];Close;Danger;🔚]
      ;$getGlobalVar[luckyColor]]
    
  `
}