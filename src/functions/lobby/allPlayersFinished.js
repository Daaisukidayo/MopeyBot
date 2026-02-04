export default {
  name: 'allPlayersFinished',
  code: `
    $if[$dump[$getProgress;teamID]==-1;$return]

    $jsonLoad[lobby;$getChannelVar[lobby]]
    $jsonLoad[allPlayers;$env[lobby;allPlayers]]
    $jsonLoad[teams;$env[lobby;teams]]

    $let[allFinished;$arrayEvery[allPlayers;ID;$return[$checkCondition[$dump[$getProgress[$env[ID]];started]==false]]]]

    $if[$get[allFinished];;$return]
    
    $let[lang;$dump[$getProfile[$env[lobby;host]];language]]

    $fn[E;
      $return[$switch[$get[pos];
        $case[1;🥇]
        $case[2;🥈]
        $case[3;🥉]
        $case[default;\`#$get[pos]\`]
      ]]
    ]

    $if[$arrayLength[teams]==1;

      $arrayMap[allPlayers;ID;
        $return[$getProgress[$env[ID]]]
      ;results]

      $!arrayAdvancedSort[results;A;B;
        $return[$math[$env[B;points] - $env[A;points]]]
      ]

      $let[winner;$username[$env[results;0;userID]]]

      $arrayLoad[topOneIndexes]

      $loop[$arrayLength[results];
        $if[$env[results;0;points]==$env[results;$env[i];points];;$break]
        $arrayPush[topOneIndexes;$env[i]]
      ;i;true]

      $if[$arrayLength[topOneIndexes]>0;
        $arrayUnshift[topOneIndexes;0]
        $let[winner;$tl[ui.lobby.friendship]]
      ]

      $let[pos;0]
      
      $arrayMap[results;result;
        $let[i;$get[pos]]
        $letSum[pos;1]

        $let[emoji;$callFn[E]]

        $if[$arrayIncludes[topOneIndexes;$get[i]];
          $let[emoji;🏅]
        ]

        $return[$tl[ui.lobby.sortedPlayersContent;$get[emoji];$username[$env[result;userID]];$env[result;points]]]
      ;playersInLB]

      $sendMessage[$channelID;
        $addContainer[
          $addTextDisplay[$tl[ui.lobby.winner;\`$get[winner]\`]]
          $addSeparator[Small]
          $arrayForEach[playersInLB;elem;
            $addTextDisplay[$env[elem]]
            $addSeparator[Small;false]
          ]
        ;$getGlobalVar[luckyColor]]
      ]

    ; $c[=========================================================================================]

      $arrayForEach[allPlayers;ID;
        $jsonLoad[CP;$getProgress[$env[ID]]]
        $let[points;$math[$env[CP;points] + $env[teams;$env[CP;teamID];points]]]
        $!jsonSet[teams;$env[CP;teamID];points;$get[points]]
      ]

      $arrayAdvancedSort[teams;A;B;$math[$env[B;points] - $env[A;points]];results]

      $let[winnerTeam;$env[results;0;teamID]]
      $letSum[winnerTeam;1]

      $let[winner;$tl[ui.lobby.team;\`$get[winnerTeam]\`]]

      $let[pos;0]
      $arrayLoad[topOneIndexes]

      $loop[$arrayLength[results];
        $if[$env[results;0;points]==$env[results;$env[i];points];;$break]
        $arrayPush[topOneIndexes;$env[i]]
      ;i;true]

      $if[$arrayLength[topOneIndexes]>0;
        $arrayUnshift[topOneIndexes;0]
        $let[winner;\`$tl[ui.lobby.friendship]\`]
      ]
      
      $arrayMap[results;result;
        $let[i;$get[pos]]
        $letSum[pos;1]

        $let[emoji;$callFn[E]]

        $if[$arrayIncludes[topOneIndexes;$get[i]];
          $let[emoji;🏅]
        ]

        $jsonLoad[playersInTeam;$env[result;players]]
        $arrayAdvancedSort[playersInTeam;A;B;
          $return[$math[$dump[$getProgress[$env[B]];points] - $dump[$getProgress[$env[A]];points]]]
        ;sortedPlayers]

        $arrayMap[sortedPlayers;ID;
          $return[$tl[ui.lobby.sortedPlayersInSortingTeamsContent;$username[$env[ID]];$dump[$getProgress[$env[ID]];points]]]
        ;sortedPlayersContent]

        $return[$tl[ui.lobby.sortedTeamsContent;$get[emoji];$math[$env[result;teamID] + 1];$env[result;points]]\n$arrayJoin[sortedPlayersContent;\n]]
      ;teamsInLB]

      $sendMessage[$channelID;
        $addContainer[
          $addTextDisplay[$tl[ui.lobby.winner;$get[winner]]]
          $addSeparator[Small]
          $arrayForEach[teamsInLB;elem;
            $addTextDisplay[$env[elem]]
            $addSeparator[Small;false]
          ]
        ;$getGlobalVar[luckyColor]]
      ]
    ]
    $clearEveryProgress
  `
}