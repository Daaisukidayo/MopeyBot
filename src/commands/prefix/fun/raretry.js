export default { 
  name: "raretry", 
  aliases: ["rt"], 
  type: "messageCreate", 
  code: ` 
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown[5s]

    $jsonLoad[raretryVarData;$getGlobalVar[raretryVarData]]
    $jsonLoad[multipliers;$env[raretryVarData;multipliers]]
    $jsonLoad[categories;$env[raretryVarData;categories]]
    $jsonLoad[modes;$env[raretryVarData;modes]]
    $jsonLoad[userWardrobe;$getUserVar[userWardrobe]]
    $jsonLoad[rareGroups;$readFile[src/json/raresInRaretry.json]]

    $let[rtMode;$default[$toLowerCase[$message[0]];$env[userProfile;rtMode]]]

    $if[$isNumber[$get[rtMode]]==false;
      $jsonLoad[rtModes;$tl[data.raretryModes]]
      $arrayLoad[rtModeV;, ;$jsonValues[rtModes]]
      $let[rtMode;$arrayIndexOf[rtModeV;$toTitleCase[$get[rtMode]]]]
    ]

    $onlyIf[$arrayIncludes[modes;$get[rtMode]];
      $newError[$tl[ui.raretry.unknownMode]]
    ]

    $let[al;$arrayLength[rareGroups]]
    $let[li;$math[$get[al] - 1]]
    $let[arg;$message[1]]
    $let[isDev;$checkCondition[$env[userProfile;devMode]==1]]
    $let[lastDailyRaretry;$default[$env[userProfile;limiters;lastDailyRaretry];-1]]
    $let[caughtCount;0]
    $let[color;$getGlobalVar[errorColor]]
    $let[desc;$tl[ui.raretry.nothing]]

    $c[targetID = category index]
    $let[targetID;$function[
      $if[$and[$get[isDev];$get[arg]!=;$isNumber[$get[arg]];$get[arg]>-1;$get[arg]<=$get[li]];
        $return[$get[arg]]
      ]
      
      $return[-1]
    ]]


    $arrayLoad[footer;   ;$tl[ui.raretry.mode;$tl[data.raretryModes.$get[rtMode]]]]

    $fn[embed;
      $addContainer[
        $addAuthorDisplay

        $if[$get[image]!=;
          $addSection[
            $addTextDisplay[$get[desc]]
            $addThumbnail[$get[image]]
          ]
        ;
          $addTextDisplay[$get[desc]]
        ]
        
        $addSeparator[Large]
        $addTextDisplay[$arrayJoin[footer;\n]]

      ;$get[color]]
    ]

    
    $loop[$get[al];
      $let[i;$math[$env[i] - 1]]
      $jsonLoad[group;$arrayAt[rareGroups;$get[i]]]

      $let[rtIndex;$math[$get[i] + $get[rtMode]]]
      $let[baseChance;$env[raretryVarData;rarities;$get[rtIndex]]]

      $let[condition;$function[
        $if[$get[targetID]==-1;
          $return[$checkCondition[$random[1;$get[baseChance]]==1]]
        ]

        $return[$checkCondition[$get[i]==$get[targetID]]]
      ]]

      $if[$get[condition];;$continue]

      $letSum[caughtCount;1]
      
      $let[animalID;$advArrayRandomValue[$env[group;animalIDs]]]
      $let[MC;$math[$env[raretryVarData;coins;$get[rtIndex]] * $arrayAt[multipliers;$get[rtMode]]]] $c[Can be 0]
      $let[image;$getAnimalVariantInfo[$get[animalID];img]]
      $let[animalDisplay;$getAnimalVariantInfo[$get[animalID];name]]
      $let[category;$tl[data.raretryCategories.$arrayAt[categories;$get[i]]]]

      $if[$get[MC]!=0;
        $delete[extraContent]
        $let[extraContent;\n$tl[ui.raretry.earned;$separate[$get[MC]]]]
        $sumCash[$get[MC]]
      ]

      $let[desc;$tl[ui.raretry.gotRares;$get[animalDisplay]]$get[extraContent]]
      
      $arrayCreate[footer]
      $arrayPush[footer;$tl[ui.raretry.rarity;1;$separate[$get[baseChance]]]]
      $arrayPush[footer;$tl[ui.raretry.category;$get[category]]]
      $arrayPush[footer;$tl[ui.raretry.mode;$tl[data.raretryModes.$get[rtMode]]]]

      $let[color;$env[group;color]]

      $callFn[embed]
    ;i]


    $if[$get[caughtCount]>0;

      $if[$get[lastDailyRaretry]!=$day;
        $setUserVar[caughtRaresInRaretry;$math[$getUserVar[caughtRaresInRaretry] + $get[caughtCount]]]
        $if[$getUserVar[caughtRaresInRaretry]>=$getGlobalVar[maxRaretryRares];
          $!jsonSet[userProfile;limiters;lastDailyRaretry;$day]
          
          $async[
            $wait[1s]
            $sendMessage[$channelID;$tl[ui.special.caughtRares;<@$authorID>;$getGlobalVar[maxRaretryRares];$commandName]]
          ]
        ]
      ]

      $saveProfile
    ;
      $callFn[embed]
    ]
  `
}