export default { 
  name: "raretry", 
  aliases: ["rt"], 
  type: "messageCreate", 
  code: `
    $reply

    $let[cdTime;5s]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
    $callFunction[cooldown;$get[cdTime]]

    $jsonLoad[animals;$readFile[json/animals.json]]
    $jsonLoad[raretryVarData;$getGlobalVar[raretryVarData]]
    $jsonLoad[multipliers;$env[raretryVarData;multipliersForRaretry]]
    $jsonLoad[userWardrobe;$env[userProfile;userWardrobe]]
    $jsonLoad[raresGroup;$readFile[json/raresInRaretry.json]]
    $jsonLoad[categories;$env[raretryVarData;categories]]
    $jsonLoad[raretryModes;$env[raretryVarData;raretryModes]]
    $let[rtMode;$env[userProfile;rtMode]]
    $onlyIf[$arrayIncludes[raretryModes;$toTitleCase[$get[rtMode]]];## Unknown raretry mode]

    $jsonLoad[l10n;$readFile[json/localizations.json]]
    $let[language;$env[userProfile;language]]

    $let[rarityContent;$default[$env[l10n;raretry;0;$get[language]];???]]
    $let[categoryContent;$default[$env[l10n;raretry;1;$get[language]];???]]
    $let[raretryModeContent;$default[$env[l10n;raretry;2;$get[language]];???]]
    $jsonLoad[raretryFailsCatch;$default[$env[l10n;raretry;3;$get[language]];["???"\\]]]
    $jsonLoad[raretrySuccessCatch;$default[$env[l10n;raretry;4;$get[language]];["???"\\]]]
    $jsonLoad[raretryRewardContent;$default[$env[l10n;raretry;5;$get[language]];["???"\\]]]

    $let[al;$arrayLength[raresGroup]]
    $let[i;$math[$get[al] - 1]]
    $let[MC;0]
    $let[arg;$message[0]]

    $switch[$get[rtMode];
      $case[default;$let[rtModeNum;0]]
      $case[medium;$let[rtModeNum;1]]
      $case[hard;$let[rtModeNum;2]]
      $case[insane;$let[rtModeNum;3]]
      $case[impossible;$let[rtModeNum;4]]
    ]

    $getGlobalVar[author]
    $color[$getGlobalVar[errorColor]]
    $description[## $arrayRandomValue[raretryFailsCatch]]
    $footer[$get[raretryModeContent]: $toTitleCase[$get[rtMode]]]


    $if[$and[$env[userProfile;devMode];$get[arg]!=;$isNumber[$get[arg]];$get[arg]>-1;$get[arg]<=$get[i]];
      $let[targetID;$get[arg]]
    ;
      $let[targetID;-1]
    ]

    $arrayForEach[raresGroup;group;
      $let[MC;0]
      $let[rtIndex;$math[$get[i] + $get[rtModeNum]]]
      $let[baseChance;$env[raretryVarData;chancesForRaretry;$get[rtIndex]]]

      $let[cond1;$and[$get[targetID]!=-1;$env[group;ID]==$get[targetID]]]
      $let[cond2;$and[$get[targetID]==-1;1==$randomNumber[1;$sum[1;$get[baseChance]]]]]

      $if[$or[$get[cond1];$get[cond2]];

        $jsonLoad[animalIDs;$env[group;animalIDs]]
        $let[animalID;$arrayRandomValue[animalIDs]]
        $let[MC;$math[$env[raretryVarData;coinsForRaretry;$get[rtIndex]] * $arrayAt[multipliers;$get[rtModeNum]]]]
        $let[thumbnail;$env[animals;$get[animalID];variants;0;img]]
        $let[animalEmoji;$env[animals;$get[animalID];variants;0;emoji]]
        $let[category;$arrayAt[categories;$get[i]]]

        $if[$get[MC]!=0;
          $let[extraContent;$arrayRandomValue[raretryRewardContent] $separateNumber[$get[MC];.]$getGlobalVar[emoji]]
        ]
        $description[## $arrayRandomValue[raretrySuccessCatch] $get[animalEmoji] $get[extraContent]]
        $thumbnail[$get[thumbnail]]
        $footer[$get[rarityContent]: 1/$separateNumber[$get[baseChance];,] • $get[categoryContent]: $get[category] • $get[raretryModeContent]: $toTitleCase[$get[rtMode]]]
        $color[$env[group;color]]

        $callFunction[sumMC;$get[MC]]
        $setUserVar[userProfile;$env[userProfile]]
        $sendMessage[$channelID]
      ]
      $letSub[i;1]
    ]
  `
}