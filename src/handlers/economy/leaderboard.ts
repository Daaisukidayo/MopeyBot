import { ForgeFunction } from "@tryforge/forgescript";

export default new ForgeFunction({
  name: 'handleLeaderboard',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    
    $onlyIf[$hasCache[leaderboard;cachedLB];
      $newError[$tl[ui.leaderboard.notReady.$get[l]]]
    ]

    $addCooldown

    $defer
    
    $let[arg1;$default[$option[page];$message[0]]]
    $let[arg2;$default[$option[rows];$message[1]]]

    $arrayCreate[LBpages]
    $getCache[leaderboard;cachedLB;cachedLB]
    
    $let[rowsPerPage;$function[
      $if[$and[$get[arg2]!=;$isNumber[$get[arg2]];$get[arg2]<=10;$get[arg2]>=1];
        $return[$get[arg2]]
      ]
      $return[10]
    ]]

    $loop[$arrayLength[cachedLB];
      $if[$math[($env[i] - 1) % $get[rowsPerPage]]==0;
        $arrayPushJSON[LBpages;$arraySplice[cachedLB;0;$get[rowsPerPage]]]
      ]
    ;i;true]

    $let[maxPages;$arrayLength[LBpages]]
    $let[page;$function[
      $if[$and[$get[arg1]!=;$isNumber[$get[arg1]];$get[arg1]<=$get[maxPages];$get[arg1]>=1];
        $return[$get[arg1]]
      ]
      $return[1]
    ]]

    $!jsonSet[cachedLB;$arrayAt[LBpages;$math[$get[page]-1]]]

    $leaderboardEmbed

    $let[msgID;$send]

    $if[$get[maxPages]>1;
      $setMessageVar[LBpages;$env[LBpages];$get[msgID]]
      $newLeaderboardTimeout
    ]
  `
})