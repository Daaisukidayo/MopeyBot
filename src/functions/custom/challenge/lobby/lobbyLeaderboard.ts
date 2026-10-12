import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "lobbyLeaderboard",
  description:
    "Returns the standings of the lobby loaded in 'lobby' as an object with keys: 'solo' (one team), 'lines' (a player, or a team with its players, per line) and 'winner'.",
  output: ArgType.Json,
  params: [
    {
      name: "lobbyVar",
      description: "The name of the variable that holds the lobby.",
      type: ArgType.String
    }
  ],
  code: `
    $ref[lobby;$env[lobbyVar]]
    $let[l;$jsonGet[userProfile;language]]
    $let[type;$jsonGet[$getGlobalVar[victoriesMap];$jsonGet[lobby;settings;victoryType]]]
    $let[solo;$checkCondition[$jsonSize[lobby;teams]==1]]

    $c[Every progress is read once. A team counts the points and rares of its own players, so its total always matches the lines under it]
    $jsonLoad[progresses;$objectOf]
    $arrayForEach[$arrayUnique[$jsonGet[lobby;allPlayers]];ID;
      $!jsonSet[progresses;$env[ID];$getProgress[$env[ID]]]
    ]
    $jsonLoad[results;$if[$get[solo];
      $arrayMap[$jsonGet[lobby;allPlayers];ID;$return[$jsonGet[progresses;$env[ID]]]]
    ;
      $arrayMap[$jsonGet[lobby;teams];team;
        $jsonLoad[players;$arrayMap[$jsonGet[team;players];ID;$return[$jsonGet[progresses;$env[ID]]]]]
        $return[$objectOf[teamID;$jsonGet[team;teamID];points;$arraySum[players;points];rares;$arraySum[players;rares];players;$arraySortBy[players;desc;$get[type]]]]
      ]
    ]]
    $jsonLoad[results;$arraySortBy[results;desc;$get[type]]]

    $c[Everyone with the best result shares the first place]
    $let[topCount;$arrayCount[results;result;$jsonGet[result;$get[type]]==$jsonGet[results;0;$get[type]]]]
    $let[winner;$if[$get[topCount]>1;\`$tl[ui.lobby.friendship.$get[l]]\`;$if[$get[solo];\`$username[$jsonGet[results;0;userID]]\`;$tl[ui.lobby.team.$get[l];\`$math[$jsonGet[results;0;teamID] + 1]\`]]]]

    $arrayMap[results;result;
      $let[emoji;$if[$and[$get[topCount]>1;$env[i]<$get[topCount]];🏅;$getPositionEmoji[$math[$env[i] + 1]]]]
      $if[$get[solo];
        $return[$tl[ui.lobby.sortedPlayersContent.$get[l];$get[emoji];$username[$jsonGet[result;userID]];$jsonGet[result;points];$jsonGet[result;rares]]]
      ]
      $arrayMap[$jsonGet[result;players];progress;
        $return[$tl[ui.lobby.sortedPlayersInSortingTeamsContent.$get[l];$username[$jsonGet[progress;userID]];$jsonGet[progress;points];$jsonGet[progress;rares]]]
      ;playerLines]
      $return[$tl[ui.lobby.sortedTeamsContent.$get[l];$get[emoji];$math[$jsonGet[result;teamID] + 1];$jsonGet[result;points];$jsonGet[result;rares]]\n> \n$arrayJoin[playerLines;\n]]
    ;lines;i]

    $return[$objectOf[solo;$get[solo];lines;$env[lines];winner;$get[winner]]]
  `
})
