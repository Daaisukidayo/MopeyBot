// TODO
import loadLobbyVars from '../../JSfunctions/lobby/loadVars.js'

export default {
  name: 'lobbyEnd',
  code: `
    $if[$env[challengeProgress;teamID]==-1;$stop]

    ${loadLobbyVars()}
    $let[allFinished;$arrayEvery[allPlayers;ID;$jsonLoad[CHP;$getUserVar[challengeProgress|$channelID;$env[ID]]] $return[$checkCondition[$env[CHP;started]==false]]]]

    $if[$get[allFinished];;$stop]

    $if[$arrayLength[teams]==1;

      $arrayLoad[result]
      $arrayForEach[allPlayers;ID;
        $jsonLoad[CHP;$getUserVar[challengeProgress|$channelID;$env[ID]]]
        $arrayPushJSON[result;$env[CHP]]
        $deleteUserVar[participating|$channelID;$env[ID]]
        $deleteUserVar[challengeProgress|$channelID;$env[ID]]
      ]
      $arrayAdvancedSort[result;A;B;$math[$env[B;points] - $env[A;points]];result]

      $let[pos;0]
      
      $arrayMap[result;res;
        $letSum[pos;1]
        $switch[$get[pos];
          $case[1;$let[emoji;🥇]]
          $case[2;$let[emoji;🥈]]
          $case[3;$let[emoji;🥉]]
          $case[default;$let[emoji;⁘]]
        ]
        $return[### $get[emoji] $ordinal[$get[pos]] ➤ $username[$env[res;userID]] \n**$getGlobalVar[blank] Points: \`$env[res;points]\`**]
      ;playersInLB]

      $sendMessage[$channelID;
        $addContainer[
          $addTextDisplay[# 🎉 1 Hour Luck Challenge Winner: \`$username[$env[result;0;userID]]\` 🎉]
          $addSeparator
          $addTextDisplay[$arrayJoin[playersInLB;\n]]
        ;$getGlobalVar[luckyColor]]
      ]

    ;

      $arrayForEach[allPlayers;ID;
        $jsonLoad[CHP;$getUserVar[challengeProgress|$channelID;$env[ID]]]
        $let[points;$math[$env[CHP;points] + $env[teams;$env[CHP;teamID];points]]]
        $!jsonSet[teams;$env[CHP;teamID];points;$get[points]]
      ]

      $log[New teams: $env[teams]]

      $arrayAdvancedSort[teams;A;B;$math[$env[B;points] - $env[A;points]];results]

      $log[New results: $env[results]]

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
          $return[$username[$env[ID]]: $env[CHP;points] Points]
        ;sortedPlayersContent]

        $return[## $get[emoji] $ordinal[$get[pos]] ➤ Team $math[$env[result;teamID] + 1] - \`$env[result;points]\`\n### $getGlobalVar[blank] $arrayJoin[sortedPlayersContent;\n### $getGlobalVar[blank] ]]
      ;teamsInLB]

      $sendMessage[$channelID;
        $addContainer[
          $addTextDisplay[# 🎉 1 Hour Luck Challenge Winner: \`Team $math[$env[results;0;teamID] + 1]\` 🎉]
          $addSeparator
          $addTextDisplay[$arrayJoin[teamsInLB;\n]]
        ;$getGlobalVar[luckyColor]]
      ]

    ]
    $callFunction[deleteLobbyVars]
  `
}