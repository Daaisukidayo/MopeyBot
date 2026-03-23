export default {
  name: 'allPlayersFinished',
  code: `
    $if[$dump[$getProgress;teamID]==-1;$return]

    $jsonLoad[lobby;$getChannelVar[lobby]]
    $jsonLoad[allPlayers;$env[lobby;allPlayers]]
    $jsonLoad[teams;$env[lobby;teams]]

    $if[$arrayEvery[allPlayers;ID;$return[$checkCondition[$dump[$getProgress[$env[ID]];started]==false]]];;$return]
    
    $let[lang;$dump[$getProfile[$env[lobby;host]];language]]
    $let[type;$env[lobby;settings;victoryType]]

    $if[$arrayLength[teams]==1;

      $jsonLoad[lb;$generatePlayersLb]
      $let[winner;$env[lb;winner]]
      $jsonLoad[playersInLB;$env[lb;playersInLB]]

      $sendMessage[$channelID;
        $addContainer[
          $addTextDisplay[$tl[ui.lobby.winner;\`$get[winner]\`]]
          $addSeparator[Small]
          $arrayForEach[playersInLB;elem;
            $addTextDisplay[$env[elem]]
            $addSeparator[Small;false]
          ]
          $addSeparator[Large]
          $addTextDisplay[$tl[ui.lobby.victoryTypeTitle;$tl[data.victoryTypes.$get[type]]]]
        ;$getGlobalVar[luckyColor]]
      ]


    ; $c[=========================================================================================]

      
      $jsonLoad[lb;$generateTeamsLb]
      $let[winner;$env[lb;winner]]
      $jsonLoad[teamsInLB;$env[lb;teamsInLB]]

      $sendMessage[$channelID;
        $addContainer[
          $addTextDisplay[$tl[ui.lobby.winner;$get[winner]]]
          $addSeparator[Small]
          $arrayForEach[teamsInLB;elem;
            $addTextDisplay[$env[elem]]
            $addSeparator[Large]
          ]
          $addSeparator[Large]
          $addTextDisplay[$tl[ui.lobby.victoryTypeTitle;$tl[data.victoryTypes.$get[type]]]]
        ;$getGlobalVar[luckyColor]]
      ]
    ]
    $clearEveryProgress
  `
}