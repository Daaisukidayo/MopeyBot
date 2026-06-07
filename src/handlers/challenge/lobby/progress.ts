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
      $newError[$tl[$get[l];ui;lobby.notStarted]]
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
        $addTextDisplay[$tl[$get[l];ui;lobby.lobbyProgressTitle]]
        $addSeparator[Large]
        $arrayForEach[playersInLB;elem;
          $addTextDisplay[$env[elem]]
          $addSeparator[Small;false]
        ]
        $addSeparator[Large]
        $addTextDisplay[$tl[$get[l];ui;lobby.victoryTypeTitle;$tl[$get[l];data;victoryTypes.$get[type]]]]
      ;$getGlobalVar[luckyColor]]
  
    ;

      $jsonLoad[lb;$generateTeamsLb]
      $jsonLoad[teamsInLB;$env[lb;teamsInLB]]

      $addContainer[
        $addAuthorDisplay
        $addTextDisplay[$tl[$get[l];ui;lobby.lobbyProgressTitle]]
        $addSeparator[Large]
        $arrayForEach[teamsInLB;elem;
          $addTextDisplay[$env[elem]]
          $addSeparator[Large]
        ]
        $addSeparator[Large]
        $addTextDisplay[$tl[$get[l];ui;lobby.victoryTypeTitle;$tl[$get[l];data;victoryTypes.$get[type]]]]
      ;$getGlobalVar[luckyColor]]
    ]
  `
}