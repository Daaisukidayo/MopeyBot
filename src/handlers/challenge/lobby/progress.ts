export default {
  name: 'handleProgress',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $jsonLoad[lobby;$getChannelVar[lobby]]
    $checkLobby
    $onlyIf[$env[lobby;started];
      $newError[$tl[ui.lobby.notStarted.$get[l]]]
    ]

    $defer

    $jsonLoad[teams;$env[lobby;teams]]
    $jsonLoad[allPlayers;$env[lobby;allPlayers]]

    $let[type;$env[lobby;settings;victoryType]]

    $if[$arrayLength[teams]==1;

      $jsonLoad[lb;$generatePlayersLb]
      $jsonLoad[playersInLB;$env[lb;playersInLB]]

      $addContainer[
        $addAuthorDisplay
        $addTextDisplay[$tl[ui.lobby.lobbyProgressTitle.$get[l]]]
        $addSeparator[Large]
        $arrayForEach[playersInLB;elem;
          $addTextDisplay[$env[elem]]
          $addSeparator[Small;false]
        ]
        $addSeparator[Large]
        $addTextDisplay[$tl[ui.lobby.victoryTypeTitle.$get[l];$tl[data.victoryTypes.$get[type].$get[l]]]]
      ;$getGlobalVar[luckyColor]]
  
    ;

      $jsonLoad[lb;$generateTeamsLb]
      $jsonLoad[teamsInLB;$env[lb;teamsInLB]]

      $addContainer[
        $addAuthorDisplay
        $addTextDisplay[$tl[ui.lobby.lobbyProgressTitle.$get[l]]]
        $addSeparator[Large]
        $arrayForEach[teamsInLB;elem;
          $addTextDisplay[$env[elem]]
          $addSeparator[Large]
        ]
        $addSeparator[Large]
        $addTextDisplay[$tl[ui.lobby.victoryTypeTitle.$get[l];$tl[data.victoryTypes.$get[type].$get[l]]]]
      ;$getGlobalVar[luckyColor]]
    ]
  `
}