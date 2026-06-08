"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'generateTeamsLb',
    code: `
    $let[l;$env[userProfile;language]]
    $jsonLoad[output;{}]

    $if[$hasCache[victoriesMap]==false;
      $setCache[victoriesMap;$getGlobalVar[victoriesMap]]
    ]

    $getCache[victoriesMap;victoriesMap]

    $arrayLoad[topOneIndexes]
    $getCache[usernames;usernames]

    $let[type;$env[victoriesMap;$env[lobby;settings;victoryType]]]

    $arrayForEach[allPlayers;ID;
      $jsonLoad[challengeProgress;$getProgress[$env[ID]]]
      $let[count;$math[$env[challengeProgress;$get[type]] + $env[teams;$env[challengeProgress;teamID];$get[type]]]]
      $jsonSet[teams;$env[challengeProgress;teamID];$get[type];$get[count]]
    ]

    $arrayAdvancedSort[teams;A;B;$math[$env[B;$get[type]] - $env[A;$get[type]]];results]

    $let[winnerTeam;$env[results;0;teamID]]
    $letSum[winnerTeam;1]

    $let[winner;$tl[$get[l];ui;lobby.team;\`$get[winnerTeam]\`]]

    $arrayLoad[topOneIndexes]

    $loop[$arrayLength[results];
      $if[$env[results;0;$get[type]]==$env[results;$env[i];$get[type]];;$break]
      $arrayPush[topOneIndexes;$env[i]]
    ;i;true]

    $if[$arrayLength[topOneIndexes]>0;
      $arrayUnshift[topOneIndexes;0]
      $let[winner;\`$tl[$get[l];ui;lobby.friendship]\`]
    ]

    $let[pos;0]
    
    $arrayMap[results;result;
      $let[i;$get[pos]]
      $letSum[pos;1]

      $let[emoji;$getPositionEmoji[$get[pos]]]

      $if[$arrayIncludes[topOneIndexes;$get[i]];
        $let[emoji;🏅]
      ]

      $jsonLoad[playersInTeam;$env[result;players]]
      $arrayAdvancedSort[playersInTeam;A;B;
        $return[$math[$dump[$getProgress[$env[B]];$get[type]] - $dump[$getProgress[$env[A]];$get[type]]]]
      ;sortedPlayers]

      $arrayMap[sortedPlayers;ID;
        $jsonLoad[challengeProgress;$getProgress[$env[ID]]]
        $return[$tl[$get[l];ui;lobby.sortedPlayersInSortingTeamsContent;$env[usernames;$env[ID]];$env[challengeProgress;points];$env[challengeProgress;rares]]]
      ;sortedPlayersContent]

      $return[$tl[$get[l];ui;lobby.sortedTeamsContent;$get[emoji];$math[$env[result;teamID] + 1];$env[result;points];$env[result;rares]]\n> \n$arrayJoin[sortedPlayersContent;\n]]
    ;teamsInLB]

    $jsonSet[output;teamsInLB;$env[teamsInLB]]
    $jsonSet[output;winner;$get[winner]]

    $return[$env[output]]
  `
};
//# sourceMappingURL=generateTeamsLb.js.map