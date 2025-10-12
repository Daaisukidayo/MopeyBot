import universalSnippets from "#snippets/universalSnippets.js";

export default { 
  name: "raretry", 
  aliases: ["rt"], 
  type: "messageCreate", 
  code: `
    $reply
    ${universalSnippets.checkProfile({time: '5s'})}

    $jsonLoad[animals;$readFile[src/json/animals.json]]
    $jsonLoad[animalsIndexes;$getGlobalVar[animalsIndexes]]
    $jsonLoad[raretryVarData;$getGlobalVar[raretryVarData]]
    $jsonLoad[multipliers;$env[raretryVarData;multipliersForRaretry]]
    $jsonLoad[userWardrobe;$getUserVar[userWardrobe]]
    $jsonLoad[raresGroup;$readFile[src/json/raresInRaretry.json]]
    $jsonLoad[categories;$env[raretryVarData;categories]]
    $jsonLoad[raretryModes;$env[raretryVarData;raretryModes]]
    $let[rtMode;$env[userProfile;rtMode]]
    $onlyIf[$arrayIncludes[raretryModes;$toTitleCase[$get[rtMode]]];## Unknown raretry mode]

    $jsonLoad[LOC;$readFile[src/json/localizations.json]]
    $let[lang;$env[userProfile;language]]

    $let[rarityContent;$default[$env[LOC;raretry;0;$get[lang]];???]]
    $let[categoryContent;$default[$env[LOC;raretry;1;$get[lang]];???]]
    $let[raretryModeContent;$default[$env[LOC;raretry;2;$get[lang]];???]]
    $jsonLoad[raretryFailsCatch;$default[$env[LOC;raretry;3;$get[lang]];["???"\\]]]
    $jsonLoad[raretrySuccessCatch;$default[$env[LOC;raretry;4;$get[lang]];["???"\\]]]
    $jsonLoad[raretryRewardContent;$default[$env[LOC;raretry;5;$get[lang]];["???"\\]]]

    $let[al;$arrayLength[raresGroup]]
    $let[i;$math[$get[al] - 1]]
    $let[arg;$message[0]]
    $let[isDev;$env[userProfile;devMode]]
    $let[lastDailyRaretry;$default[$env[userProfile;limiters;lastDailyRaretry];-1]]


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


    $if[$and[$get[isDev];$get[arg]!=;$isNumber[$get[arg]];$get[arg]>-1;$get[arg]<=$get[i]];
      $let[targetID;$get[arg]]
    ;
      $let[targetID;-1]
    ]

    $arrayForEach[raresGroup;group;
      $let[rtIndex;$math[$get[i] + $get[rtModeNum]]]
      $let[baseChance;$env[raretryVarData;chancesForRaretry;$get[rtIndex]]]

      $let[cond1;$and[$get[targetID]!=-1;$env[group;ID]==$get[targetID]]]
      $let[cond2;$and[$get[targetID]==-1;1==$randomNumber[1;$sum[1;$get[baseChance]]]]]

      $if[$or[$get[cond1];$get[cond2]]; $c[Catch]

        $jsonLoad[animalIDs;$env[group;animalIDs]]
        $let[animalID;$arrayRandomValue[animalIDs]]
        $let[MC;$math[$env[raretryVarData;coinsForRaretry;$get[rtIndex]] * $arrayAt[multipliers;$get[rtModeNum]]]] $c[Can be 0]
        $let[thumbnail;$env[animals;$env[animalsIndexes;$get[animalID]];variants;0;img]]
        $let[animalEmoji;$env[animals;$env[animalsIndexes;$get[animalID]];variants;0;emoji]]
        $let[category;$arrayAt[categories;$get[i]]]

        $if[$get[MC]!=0;
          $let[extraContent;$arrayRandomValue[raretryRewardContent] $separateNumber[$get[MC];.]$getGlobalVar[emoji]]
          $callFunction[sumMC;$get[MC]]
        ]
        $description[## $arrayRandomValue[raretrySuccessCatch] $get[animalEmoji] $get[extraContent]] $delete[extraContent]
        $thumbnail[$get[thumbnail]]
        $footer[$get[rarityContent]: 1/$separateNumber[$get[baseChance];,] • $get[categoryContent]: $get[category] • $get[raretryModeContent]: $toTitleCase[$get[rtMode]]]
        $color[$env[group;color]]
        $getGlobalVar[author]
        $sendMessage[$channelID]

        $if[$get[lastDailyRaretry]!=$day;
          $setUserVar[catchedRaresInRaretry;$sum[$getUserVar[catchedRaresInRaretry];1]]
          $if[$getUserVar[catchedRaresInRaretry]>=$getGlobalVar[maxRaretryRares];
            $!jsonSet[userProfile;limiters;lastDailyRaretry;$day]
            $let[lastDailyRaretry;$day]
            $sendMessage[$channelID;## <@$authorID>, you have caught $getGlobalVar[maxRaretryRares] \`$commandName\` rares!]
          ]
        ]
        $setUserVar[userProfile;$env[userProfile]]
      ]
      $letSub[i;1]
    ]
  `
}