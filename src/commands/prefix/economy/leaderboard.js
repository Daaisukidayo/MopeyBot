export default [{
  name: "leaderboard",
  aliases: ["lb", "top"],
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    
    $onlyIf[$and[$getGlobalVar[usernames]!=;$getGlobalVar[cachedLB]!=];
      $newError[$tl[ui.leaderboard.notReady]]
    ]

    $addCooldown[1m]
    $jsonLoad[LB;$getGlobalVar[cachedLB]]
    $arrayCreate[LBpages]

    $let[arg1;$message[0]]
    $let[arg2;$message[1]]
    
    $let[rowsCondition;$and[$get[arg2]!=;$isNumber[$get[arg2]];$get[arg2]<=10;$get[arg2]>=1]]
    $let[rowsPerPage;$if[$get[rowsCondition];$get[arg2];10]]

    $loop[$arrayLength[LB];
      $if[$math[($env[i] - 1) % $get[rowsPerPage]]==0;
        $arrayPushJSON[LBpages;$arraySplice[LB;0;$get[rowsPerPage]]]
      ]
    ;i;true]

    $let[maxPages;$arrayLength[LBpages]]
    $let[pageCondition;$and[$get[arg1]!=;$isNumber[$get[arg1]];$get[arg1]<=$get[maxPages];$get[arg1]>=1]]
    $let[page;$if[$get[pageCondition];$get[arg1];1]]

    $!jsonSet[LB;$arrayAt[LBpages;$math[$get[page]-1]]]

    ${embed()}
    $let[msgID;$sendMessage[$channelID;;true]]

    $if[$get[maxPages]>1;
      $setMessageVar[LBpages;$env[LBpages];$get[msgID]]
      ${timeout()}
    ]
  `
},{
  type: 'interactionCreate',
  allowedInteractionTypes: ['button', 'modal'],
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;leftLB,rightLB,customPageLB,customPageModal]
    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]

    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $let[page;$env[IID;0]]
    $let[rowsPerPage;$env[IID;1]]
    $let[msgID;$messageID]

    $jsonLoad[LBpages;$getMessageVar[LBpages;$get[msgID]]]
    $onlyIf[$env[LBpages]!=;$interactionFail]
    
    $let[maxPages;$arrayLength[LBpages]]


    $switch[$env[IID;2];
      $case[leftLB;
        $letSub[page;1]
        $if[$get[page]<=0;
          $let[page;$get[maxPages]]
        ]
      ]
      $case[rightLB;
        $letSum[page;1]
        $if[$get[page]>$get[maxPages];
          $let[page;1]
        ]
      ]
      $case[customPageLB; $c[custom page modal]
        $modal[$get[page]-$get[rowsPerPage]-customPageModal-$authorID;$tl[ui.leaderboard.modalTitle]]
        $addTextInput[modalInput1;$tl[ui.leaderboard.modalDescription];Short;true;$tl[ui.leaderboard.modalPlaceholderPageCondition;$get[maxPages]]]
        $showModal
        $stop
      ]
      $case[customPageModal; $c[custom page input]
        $let[page;$input[modalInput1]]
        $onlyIf[$and[$isNumber[$get[page]];$get[page]>0;$get[page]<=$get[maxPages]];
          $newError[$tl[ui.leaderboard.invalidPage]]
        ]
      ]
    ]

    $jsonLoad[LB;$arrayAt[LBpages;$math[$get[page]-1]]]

    ${embed()}
    $interactionUpdate
    ${timeout()}
  `
}]

function embed() {
  return `
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
}

function timeout() {
  return `
    $!stopTimeout[LB-$authorID]
    $!setTimeout[
      $!deleteMessage[$channelID;$get[msgID]]
      $deleteMessageVar[LBpages;$get[msgID]]
    ;1m;LB-$authorID]
  `
}