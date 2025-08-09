const CD = "1m"

module.exports = [{
  name: "caughtrares",
  aliases: ["cr", "chances", "ch", "rares"],
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
    $callFunction[cooldown;${CD}]

    $let[rtMode;$env[userProfile;rtMode]]
    ${jsonAndArray()}

    $switch[$get[rtMode];
      $case[inferno;      $let[page;1]]
      $case[default;      $let[page;2]]
      $case[medium;       $let[page;3]]
      $case[hard;         $let[page;4]]
      $case[insane;       $let[page;5]]
      $case[impossible;   $let[page;6]]
    ]

    ${rtModeNum()}
    ${buttons()}
    ${embed()}

    $let[msgid;$sendMessage[$channelID;;true]]

    ${timeout()}
  `,
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["button"],
  code: `
    $arrayLoad[interactionID;-;$customID]
    $arrayLoad[passKeys;,;leftCR,rightCR]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[interactionID;$env[key]]]]
    $onlyIf[$arrayIncludes[interactionID;$authorID];$callFunction[notYourBTN]]

    $let[page;$env[interactionID;0]]
    $let[msgid;$messageID]
    
    ${jsonAndArray()}

    $if[$arrayIncludes[interactionID;leftCR];
      $letSub[page;1]
      $if[$get[page]<=0;
        $let[page;$arrayLength[raretryModes]]
      ]
    ;
      $letSum[page;1]
      $if[$get[page]>$arrayLength[raretryModes];
        $let[page;1]
      ]
    ]

    $switch[$get[page];
      $case[1;$let[rtMode;inferno]]
      $case[2;$let[rtMode;default]]
      $case[3;$let[rtMode;medium]]
      $case[4;$let[rtMode;hard]]
      $case[5;$let[rtMode;insane]]
      $case[6;$let[rtMode;impossible]]
    ]
    ${rtModeNum()}

    ${embed()}
    ${buttons()}
    $interactionUpdate

    $!clearTimeout[CR-$authorID]
    ${timeout()}
  `,
}];

// functions


function embed() {
  return `
    $title[$replace[$get[desc2];{0};$toTitleCase[$get[rtMode]]]]
    $getGlobalVar[author]
    ${loop()}
    $color[$getGlobalVar[luckyColor]]
    $footer[$replace[$get[desc3];{1};$get[page]]/$arrayLength[raretryModes]]
  `;
}

function loop() {
  return `
    $arrayForEach[categories;category;
      $let[i;$arrayIndexOf[categories;$env[category]]]
      $let[quantity;$separateNumber[$env[caughtRareCategories;$get[rtMode];$get[i]];,]]
      $let[quantity;$replace[$get[desc4];{2};$get[quantity]]]

      $if[$get[rtMode]!=inferno;  
        $let[rarity;$env[raretryVarData;chancesForRaretry;other;$math[$get[i] + $get[rtModeNum]]]]
        $let[reward;$math[$env[raretryVarData;coinsForRaretry;other;$math[$get[i] + $get[rtModeNum]]] * $env[raretryVarData;multipliersForRaretry;$get[rtModeNum]]]]
      ;
        $let[rarity;$env[raretryVarData;chancesForRaretry;inferno;$get[i]]]
        $let[reward;$env[raretryVarData;coinsForRaretry;inferno;$get[i]]]
      ]

      $let[rarity;$replace[$get[desc5];{3};1/$separateNumber[$get[rarity];,]]]
      $let[reward;$replace[$get[desc6];{4};$separateNumber[$get[reward];,]]]

      $let[fieldValue;$codeBlock[$get[quantity]\n$get[rarity]\n$get[reward];JS]]

      $addField[$env[category];**$get[fieldValue]**]
    ]
  `;
}

function jsonAndArray() {
  return `
    $jsonLoad[raretryVarData;$getGlobalVar[raretryVarData]]
    $jsonLoad[caughtRareCategories;$env[userProfile;caughtRareCategories]]
    $jsonLoad[categories;$env[raretryVarData;categories]]
    $jsonLoad[raretryModes;$env[raretryVarData;raretryModes]]

    $jsonLoad[l10n;$readFile[json/localizations.json]]
    $let[l10n;$env[userProfile;language]]
    $let[specialDesc1;$env[l10n;special;specialDesc1;$get[l10n]]] 

    $loop[8; 
        $let[desc$env[i];$env[l10n;caughtRares;caughtRaresDesc$env[i];$get[l10n]]]
        $if[$get[desc$env[i]]==; $let[desc$env[i];???]] 
    ;i;true]
  `;
}


function rtModeNum() {
  return `
    $switch[$get[rtMode];
      $case[inferno;      $let[rtModeNum;-1]]
      $case[default;      $let[rtModeNum;0]]
      $case[medium;       $let[rtModeNum;1]]
      $case[hard;         $let[rtModeNum;2]]
      $case[insane;       $let[rtModeNum;3]]
      $case[impossible;   $let[rtModeNum;4]]
    ]
  `;
}

function buttons() {
  return `
    $addActionRow
    $addButton[$get[page]-leftCR-$authorID;;Primary;⬅️]
    $addButton[$get[page]-rightCR-$authorID;;Primary;➡️]
  `
}

function timeout() {
return `
$setTimeout[
  $!disableButtonsOf[$channelID;$get[msgid]]
;${CD};CR-$authorID]`
}