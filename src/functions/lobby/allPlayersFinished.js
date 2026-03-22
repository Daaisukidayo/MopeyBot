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

    $jsonLoad[victoriesMap;{
      "0": "points",
      "1": "rares"
    }]

    $let[type;$env[victoriesMap;$env[lobby;settings;victoryType]]]
    

    $if[$arrayLength[teams]==1;

      $arrayMap[allPlayers;ID;
        $return[$getProgress[$env[ID]]]
      ;results]

      $!arrayAdvancedSort[results;A;B;
        $return[$math[$env[B;$get[type]] - $env[A;$get[type]]]]
      ]

      $arrayLoad[topOneIndexes]

      $loop[$arrayLength[results];
        $if[$env[results;0;$get[type]]==$env[results;$env[i];$get[type]];;$break]
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

        $return[$tl[ui.lobby.sortedPlayersContent_$get[type];$get[emoji];$username[$env[result;userID]];$env[result;$get[type]]]]
      ;playersInLB]

      $if[$has[winner];;
        $let[winner;$username[$env[results;0;userID]]]
      ]

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
        $let[count;$math[$env[CP;$get[type]] + $env[teams;$env[CP;teamID];$get[type]]]]
        $!jsonSet[teams;$env[CP;teamID];$get[type];$get[count]]
      ]

      $arrayAdvancedSort[teams;A;B;$math[$env[B;$get[type]] - $env[A;$get[type]]];results]

      $let[winnerTeam;$env[results;0;teamID]]
      $letSum[winnerTeam;1]

      $let[pos;0]
      $arrayLoad[topOneIndexes]

      $loop[$arrayLength[results];
        $if[$env[results;0;$get[type]]==$env[results;$env[i];$get[type]];;$break]
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
          $return[$math[$dump[$getProgress[$env[B]];$get[type]] - $dump[$getProgress[$env[A]];$get[type]]]]
        ;sortedPlayers]

        $arrayMap[sortedPlayers;ID;
          $return[$tl[ui.lobby.sortedPlayersInSortingTeamsContent_$get[type];$username[$env[ID]];$dump[$getProgress[$env[ID]];$get[type]]]]
        ;sortedPlayersContent_$get[type]]

        $return[$tl[ui.lobby.sortedTeamsContent_$get[type];$get[emoji];$math[$env[result;teamID] + 1];$env[result;$get[type]]]\n$arrayJoin[sortedPlayersContent_$get[type];\n]]
      ;teamsInLB]
        

      $if[$has[winner];;
        $let[winner;$tl[ui.lobby.team;\`$get[winnerTeam]\`]]
      ]

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