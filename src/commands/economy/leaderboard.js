import universalSnippets from '#snippets/universalSnippets.js'

export default [{
  name: "leaderboard",
  aliases: ["lb", "top"],
  type: "messageCreate",
  code: `
    $reply
    ${universalSnippets.checkProfile({time: '15s'})}

    $jsonLoad[LB;$getGlobalVar[cachedLB]]
    $arrayCreate[LBpages]
    
    $let[rowsPerPage;10]
    $if[$and[$message[1]!=;$isNumber[$message[1]];$message[1]<=10;$message[1]>=1];$let[rowsPerPage;$message[1]]]

    $loop[$arrayLength[LB];
      $if[$math[($env[i] - 1) % $get[rowsPerPage]]==0;
        $arrayPushJSON[LBpages;$arraySplice[LB;0;$get[rowsPerPage]]]
      ]
    ;i;true]

    $let[maxPages;$arrayLength[LBpages]]
    $let[page;1]
    $if[$and[$message[0]!=;$isNumber[$message[0]];$message[0]<=$get[maxPages];$message[0]>=1];$let[page;$message[0]]]

    $jsonLoad[LB;$arrayAt[LBpages;$math[$get[page]-1]]]
    $let[li;$math[$arrayLength[LB] - 1]]

    $jsonLoad[lastElem;$arrayAt[LB;$get[li]]]
    $let[lastPos;$env[lastElem;pos]]

    ${embed()}
    $let[msgID;$sendMessage[$channelID;;true]]

    $if[$get[maxPages]>1;$setMessageVar[LBpages;$env[LBpages];$get[msgID]]]
    ${timeout()}
  `
},{
  type: 'interactionCreate',
  allowedInteractionTypes: ['button', 'modal'],
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;leftLB,rightLB,customPageLB,customPageModal]
    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]

    ${universalSnippets.loadProfile()}
    $onlyIf[$arrayIncludes[IID;$authorID];$callFunction[notYourBTN]]

    $let[page;$env[IID;0]]
    $let[rowsPerPage;$env[IID;1]]

    $let[msgID;$messageID]
    $onlyIf[$getMessageVar[LBpages;$get[msgID]]!=]
    $jsonLoad[LBpages;$getMessageVar[LBpages;$get[msgID]]]
    $let[maxPages;$arrayLength[LBpages]]

    $switch[$env[IID;2]; $c[code inside $customID] 
      $case[$env[passKeys;0]; $c[left button]
        $letSub[page;1]
        $if[$get[page]<=0;
          $let[page;$get[maxPages]]
        ]
      ]
      $case[$env[passKeys;1]; $c[right button]
        $letSum[page;1]
        $if[$get[page]>$get[maxPages];
          $let[page;1]
        ]
      ]
      $case[$env[passKeys;2];
        $modal[$get[page]-$get[rowsPerPage]-customPageModal-$authorID;Leaderboard page]
        $addTextInput[modalInput1;Enter leaderboard page;Short;true;Must be greater than 0 and less or equal to $get[maxPages]]
        $showModal
        $stop
      ]
      $case[$env[passKeys;3];
        $let[page;$input[modalInput1]]
        $onlyIf[$and[$isNumber[$get[page]];$get[page]>0;$get[page]<=$get[maxPages]];
          $callFunction[newError;Invalid number in «page» field!]
          $ephemeral
          $interactionReply
        ]
      ]
    ]

    $jsonLoad[LB;$arrayAt[LBpages;$math[$get[page]-1]]]
    $let[li;$math[$arrayLength[LB] - 1]]
    $jsonLoad[lastElem;$arrayAt[LB;$get[li]]]
    $let[lastPos;$env[lastElem;pos]]

    ${embed()}
    $interactionUpdate
    ${timeout()}
  `
}]

function embed() {
  return `
    $addContainer[
      $addSection[
        $addTextDisplay[# 🔝 Leaderboard]
        $addThumbnail[$getGlobalVar[leaderboardThumbnail]]
      ]

      $addSeparator[Large]

      $arrayForEach[LB;elem;

        $let[pos;$env[elem;pos]]
        $let[ID;$env[elem;ID]]
        $let[MC;$env[elem;MC]]
        $let[MUID;$env[elem;MUID]]

        $let[emoji;$trimLines[$switch[$get[pos];
          $case[1;🥇]
          $case[2;🥈]
          $case[3;🥉]
          $case[default;🏅]
        ]]]

        $addTextDisplay[## $get[emoji] $ordinal[$get[pos]] ➤ \`$username[$get[ID]]\`\n### $getGlobalVar[blank] Coins: \`$separateNumber[$get[MC];,]\`$getGlobalVar[emoji]\n### $getGlobalVar[blank] MUID: \`$get[MUID]\`]

        $if[$get[pos]<$get[lastPos];$addSeparator[Large;false]]
      ]

      $addSeparator[Large]
      $let[disabled;$if[$get[maxPages]>1;false;true]]
      
      $addActionRow
      $addButton[$get[page]-$get[rowsPerPage]-leftLB-$authorID;;Primary;⬅️;$get[disabled]]
      $addButton[$get[page]-$get[rowsPerPage]-customPageLB-$authorID;Page $get[page]/$get[maxPages];Primary;;$get[disabled]]
      $addButton[$get[page]-$get[rowsPerPage]-rightLB-$authorID;;Primary;➡️;$get[disabled]]
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