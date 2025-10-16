import uniSnippets from './universalSnippets.js'

export default {
  settingVars() {
    return `
      $let[lobbyMode;$env[lobby;mode]]
      $let[difficulty;$env[lobby;difficulty]]
      $let[host;$env[lobby;host]]
    `
  },

  loadLobbyVars() {
    return `
      $if[$env[lobby]==;$jsonLoad[lobby;$getChannelVar[lobby]]]
      $if[$env[ready]==;$jsonLoad[ready;$env[lobby;ready]]]
      $if[$env[teams]==;$jsonLoad[teams;$env[lobby;teams]]]
      $if[$env[lobbyTags]==;$jsonLoad[lobbyTags;$env[lobby;tags]]]

      $arrayLoad[allPlayers]
      $arrayMap[teams;team;$return[$env[team;players]];arrayOfPlayers]
      $arrayForEach[arrayOfPlayers;array;$arrayConcat[allPlayers;allPlayers;array]]
    `
  },

  deleteAllLobbyVars() {
    return `
      $arrayForEach[allPlayers;ID;
        $deleteUserVar[participating|$channelID;$env[ID]]
        $deleteUserVar[challengeProgress|$channelID;$env[ID]]
        $deleteUserVar[1htime|$channelID;$env[ID]]
      ]
      $deleteChannelVar[lobby]
    `
  },

  lobbyEmbed() {
    return `
      ${this.settingVars()}

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
  },

  allPlayersEnded() {
    return `
      $if[$env[challengeProgress;teamID]==-1;$stop]

      ${this.loadLobbyVars()}
      $let[allFinished;$arrayEvery[allPlayers;ID;$jsonLoad[CHP;$getUserVar[challengeProgress|$channelID;$env[ID]]] $return[$checkCondition[$env[CHP;started]==false]]]]

      $if[$get[allFinished];;$stop]

      $if[$arrayLength[teams]==1;

        $arrayMap[allPlayers;ID;
          $jsonLoad[CHP;$getUserVar[challengeProgress|$channelID;$env[ID]]]
          $deleteUserVar[participating|$channelID;$env[ID]]
          $deleteUserVar[challengeProgress|$channelID;$env[ID]]
          $return[$env[CHP]]
        ;results]
        $arrayAdvancedSort[results;A;B;$math[$env[B;points] - $env[A;points]];results]

        $let[pos;0]
        
        $arrayMap[results;result;
          $letSum[pos;1]
          $switch[$get[pos];
            $case[1;$let[emoji;🥇]]
            $case[2;$let[emoji;🥈]]
            $case[3;$let[emoji;🥉]]
            $case[default;$let[emoji;⁘]]
          ]
          $return[## $get[emoji] ➤ $username[$env[result;userID]] — \`$env[result;points]\` Points]
        ;playersInLB]

        $sendMessage[$channelID;
          $addContainer[
            $addTextDisplay[# 🎉 Winner: \`$username[$env[results;0;userID]]\` 🎉]
            $arrayForEach[playersInLB;elem;
              $addSeparator[Small;false]
              $addTextDisplay[$env[elem]]
            ]
          ;$getGlobalVar[luckyColor]]
        ]

      ;

        $arrayForEach[allPlayers;ID;
          $jsonLoad[CHP;$getUserVar[challengeProgress|$channelID;$env[ID]]]
          $let[points;$math[$env[CHP;points] + $env[teams;$env[CHP;teamID];points]]]
          $!jsonSet[teams;$env[CHP;teamID];points;$get[points]]
        ]

        $arrayAdvancedSort[teams;A;B;$math[$env[B;points] - $env[A;points]];results]

        $let[pos;0]
        
        $arrayMap[results;result;

          $letSum[pos;1]
          $switch[$get[pos];
            $case[1;$let[emoji;🥇]]
            $case[2;$let[emoji;🥈]]
            $case[3;$let[emoji;🥉]]
            $case[default;$let[emoji;⁘]]
          ]

          $jsonLoad[playersInTeam;$env[result;players]]
          $arrayAdvancedSort[playersInTeam;A;B;
            $jsonLoad[CHPa;$getUserVar[challengeProgress|$channelID;$env[A]]]
            $jsonLoad[CHPb;$getUserVar[challengeProgress|$channelID;$env[B]]]
            $return[$math[$env[CHPb;points] - $env[CHPa;points]]]
          ;sortedPlayers]

          $arrayMap[sortedPlayers;ID;
            $jsonLoad[CHP;$getUserVar[challengeProgress|$channelID;$env[ID]]]
            $return[### $getGlobalVar[blank] $username[$env[ID]]: \`$env[CHP;points]\` Points]
          ;sortedPlayersContent]

          $return[## $get[emoji] ➤ Team $math[$env[result;teamID] + 1] — \`$env[result;points]\` Points\n$arrayJoin[sortedPlayersContent;\n]]
        ;teamsInLB]

        $sendMessage[$channelID;
          $addContainer[
            $addTextDisplay[# 🎉  Winner: Team \`$math[$env[results;0;teamID] + 1]\` 🎉]
            $arrayForEach[teamsInLB;elem;
              $addSeparator[Small;false]
              $addTextDisplay[$env[elem]]
            ]
          ;$getGlobalVar[luckyColor]]
        ]
      ]
      ${this.deleteAllLobbyVars()}
    `
  },

  loadGlobalLobbyVars() {
    return `
      $jsonLoad[allLobbyTagsContent;$getGlobalVar[allLobbyTagsContent]]
      $jsonLoad[difficulties;$getGlobalVar[difficulties]]
      $jsonLoad[modes;$getGlobalVar[modes]]
      $jsonLoad[tags;$getGlobalVar[tags]]
    `
  },

  settingsChangePopUP(content = '# Nothing changed') {
    return `
      $addContainer[
        $addTextDisplay[# ⚙️ Settings Change]
        $addSeparator[Large]
        $addTextDisplay[${content}]
      ;$getGlobalVar[luckyColor]]
      $let[msg;$sendMessage[$channelID;;true]]
      $async[
        $wait[5s]
        $!deleteMessage[$channelID;$get[msg]]
      ]
    `
  },

  lobbySettingsEmbed() {
    return `
      ${this.settingVars()}
      ${uniSnippets.settingTagsContent('lobbyTags')}
      
      $addContainer[

        $addTextDisplay[# ⚙️ Settings]
        $addSeparator[Large]
        $addTextDisplay[### Mode: \`$get[lobbyMode]\`]
        $addTextDisplay[### Difficulty: \`$toTitleCase[$get[difficulty]]\`]
        $addTextDisplay[### Tags:\n**$codeBlock[$arrayJoin[tagsContent;\n]]**]

        $if[$authorID==$get[host];
          $addSeparator

          $addActionRow
          $addStringSelectMenu[addTagsLobby-$get[host];Choose Tags]
          $arrayForEach[tags;tag;
            $addOption[$env[allLobbyTagsContent;$env[tag]];(Toggle);$env[tag]]
          ]

          $addActionRow
          $addStringSelectMenu[addDifficultyLobby-$get[host];Choose Difficulty]
          $addOption[Disable Difficulty;(Select);none]
          $arrayForEach[difficulties;elem;
            $addOption[$toTitleCase[$env[elem]] Difficulty;(Select);$env[elem]]
          ]

          $addActionRow
          $addStringSelectMenu[switchLobbyMode-$get[host];Mode]
          
          $arrayForEach[modes;mode;
            $addOption[$env[mode];(Select);$env[mode]]
          ]

          $if[$arrayLength[allPlayers]>1;
            $addActionRow
            $!arraySplice[allPlayers;$arrayIndexOf[allPlayers;$get[host]];1]
            $addStringSelectMenu[giveLobbyHost-$get[host];Give Host]
            $arrayForEach[allPlayers;ID;
              $addOption[$username[$env[ID]];;$env[ID]]
            ]
          ]
        ]
      ;$getGlobalVar[luckyColor]]
    `
  },

  lobbyTimeoutName() {
    return `LOBBYTIMEOUT-$channelID`
  },

  stopLobbyTimeout() {
    return `$!stopTimeout[${this.lobbyTimeoutName()}]`
  },

  lobbyTimeout() {
    return `
      ${this.stopLobbyTimeout()}
      $setTimeout[
        $if[$getChannelVar[lobby]==;$stop]
        $!deleteMessage[$channelID;$default[$env[lobby;messageID];$messageID]]
        $sendMessage[$channelID;
          $description[## Party created by <@$get[host]> was closed due to inactivity]
          $color[Orange]
        ]
        ${this.deleteAllLobbyVars()}
      ;$getGlobalVar[lobbyInactiveTime];${this.lobbyTimeoutName()}]
    `
  },

  lobbyExist() {
    return `
      $onlyIf[$getChannelVar[lobby]!=;
        $ephemeral
        $callFunction[embed;error]
        $description[## Lobby does not exist anymore]
      ]
    `
  }
}
