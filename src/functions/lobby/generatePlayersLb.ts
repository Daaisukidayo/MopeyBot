export default {
  name: 'generatePlayersLb',
  code: `
    $let[l;$env[userProfile;language]]
    $jsonLoad[output;{}]

    $jsonLoad[victoriesMap;$getGlobalVar[victoriesMap]]

    $arrayLoad[topOneIndexes]

    $let[type;$env[victoriesMap;$env[lobby;settings;victoryType]]]

    $arrayMap[allPlayers;ID;
      $return[$getProgress[$env[ID]]]
    ;results]

    $!arrayAdvancedSort[results;A;B;
      $return[$math[$env[B;$get[type]] - $env[A;$get[type]]]]
    ]

    $let[winner;$username[$env[results;0;userID]]]

    $loop[$arrayLength[results];
      $if[$env[results;0;$get[type]]==$env[results;$env[i];$get[type]];;$break]
      $arrayPush[topOneIndexes;$env[i]]
    ;i;true]

    $if[$arrayLength[topOneIndexes]>0;
      $arrayUnshift[topOneIndexes;0]
      $let[winner;$tl[ui.lobby.friendship.$get[l]]]
    ]

    $let[pos;0]
    
    $arrayMap[results;result;
      $let[i;$get[pos]]
      $letSum[pos;1]

      $let[emoji;$getPositionEmoji[$get[pos]]]

      $if[$arrayIncludes[topOneIndexes;$get[i]];
        $let[emoji;🏅]
      ]

      $return[$tl[ui.lobby.sortedPlayersContent.$get[l];$get[emoji];$username[$env[result;userID]];$env[result;points];$env[result;rares]]]
    ;playersInLB]

    $jsonSet[output;playersInLB;$env[playersInLB]]
    $jsonSet[output;winner;$get[winner]]

    $return[$env[output]]
  `
}