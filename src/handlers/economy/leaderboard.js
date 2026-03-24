export default [{
  name: 'handleLeaderboard',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    
    $onlyIf[$and[$getGlobalVar[usernames]!=;$getGlobalVar[cachedLB]!=];
      $newError[$tl[ui.leaderboard.notReady]]
    ]

    $addCooldown

    $defer
    
    $let[arg1;$default[$option[page];$message[0]]]
    $let[arg2;$default[$option[rows];$message[1]]]

    $arrayCreate[LBpages]
    $jsonLoad[LB;$getGlobalVar[cachedLB]]
    
    $let[rowsPerPage;$function[
      $if[$and[$get[arg2]!=;$isNumber[$get[arg2]];$get[arg2]<=10;$get[arg2]>=1];
        $return[$get[arg2]]
      ]
      $return[10]
    ]]

    $loop[$arrayLength[LB];
      $if[$math[($env[i] - 1) % $get[rowsPerPage]]==0;
        $arrayPushJSON[LBpages;$arraySplice[LB;0;$get[rowsPerPage]]]
      ]
    ;i;true]

    $let[maxPages;$arrayLength[LBpages]]
    $let[page;$function[
      $if[$and[$get[arg1]!=;$isNumber[$get[arg1]];$get[arg1]<=$get[maxPages];$get[arg1]>=1];
        $return[$get[arg1]]
      ]
      $return[1]
    ]]

    $!jsonSet[LB;$arrayAt[LBpages;$math[$get[page]-1]]]

    $leaderboardEmbed

    $let[msgID;$function[
      $if[$isPrefixCommand;
        $return[$sendMessage[$channelID;;true]]
      ]
      $return[$interactionReply[;true]]
    ]]

    $if[$get[maxPages]>1;
      $setMessageVar[LBpages;$env[LBpages];$get[msgID]]
      $newLeaderboardTimeout
    ]
  `
},{
  name: 'leaderboardEmbed',
  code: `
    $jsonLoad[usernames;$getGlobalVar[usernames]]
    $arrayMap[LB;elem;
      $let[pos;$env[elem;pos]]
      $let[ID;$env[elem;ID]]
      $let[MC;$env[elem;MC]]
      $let[MUID;$env[elem;MUID]]

      $let[emoji;$function[
        $return[$switch[$get[pos];
          $case[1;🥇]
          $case[2;🥈]
          $case[3;🥉]
          $case[default;\`#$get[pos]\`]
        ]]
      ]]

      $return[$tl[ui.leaderboard.contentLine;$get[emoji];$env[usernames;$get[ID]];$get[MUID];$separate[$get[MC]]]]
    ;content]

    $addContainer[
      $addSection[
        $addTextDisplay[$tl[ui.leaderboard.title]]
        $addThumbnail[$getGlobalVar[leaderboardThumbnail]]
      ]

      $addSeparator[Large]

      $addTextDisplay[$arrayJoin[content;\n]]

      $if[$get[maxPages]>1;
        $addSeparator[Large]
        
        $addActionRow
        $addButton[$get[page]-$get[rowsPerPage]-leftLB-$authorID;;Primary;⬅️;$get[disabled]]
        $addButton[$get[page]-$get[rowsPerPage]-customPageLB-$authorID;$tl[ui.leaderboard.pageButton;$get[page];$get[maxPages]];Primary;;$get[disabled]]
        $addButton[$get[page]-$get[rowsPerPage]-rightLB-$authorID;;Primary;➡️;$get[disabled]]
      ]
    ;$getGlobalVar[defaultColor]]
  `
},{
  name: 'newLeaderboardTimeout',
  code: `
    $!stopAdvancedTimeout[leaderboard-$authorID]
    $!advancedTimeout[
      $esc[
        $deleteMessage[{channel};{message}]
        $deleteMessageVar[LBpages;{message}]
      ];
      $getGlobalVar[leaderboard_cooldown];
      leaderboard-$authorID;
      {"channel": "$channelID", "message": "$get[msgID]"}
    ]
  `
}]