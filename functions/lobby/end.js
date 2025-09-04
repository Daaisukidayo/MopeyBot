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
        $return[## $get[emoji] $ordinal[$get[pos]] ➤ $username[$env[result;userID]] — \`$env[result;points]\` Points]
      ;playersInLB]

      $sendMessage[$channelID;
        $addContainer[
          $addTextDisplay[# 🎉 Winner: \`$username[$env[results;0;userID]]\` 🎉]
          $arrayForEach[playersInLB;elem;
            $addSeparator[Large]
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
          $return[### $getGlobalVar[blank] $username[$env[ID]]: \`$env[CHP;points]\` Points]
        ;sortedPlayersContent]

        $return[## $get[emoji] $ordinal[$get[pos]] ➤ Team $math[$env[result;teamID] + 1] — \`$env[result;points]\` Points\n$arrayJoin[sortedPlayersContent;\n]]
      ;teamsInLB]

      $sendMessage[$channelID;
        $addContainer[
          $addTextDisplay[# 🎉  Winner: Team \`$math[$env[results;0;teamID] + 1]\` 🎉]
          $arrayForEach[teamsInLB;elem;
            $addSeparator[Large]
            $addTextDisplay[$env[elem]]
          ]
        ;$getGlobalVar[luckyColor]]
      ]
    ]
    $callFunction[deleteLobbyVars]
  `
}