export default {
  name: 'handleRaretry',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile

    $jsonLoad[modes;$getGlobalVar[raretryModes]]
    $jsonLoad[multipliers;$getGlobalVar[raretryMultipliers]]
    $jsonLoad[rewards;$getGlobalVar[raretryRewards]]
    $jsonLoad[rarities;$getGlobalVar[raretryRarities]]
    $jsonLoad[categories;$getGlobalVar[raretryCategories]]
    $jsonLoad[rareGroups;$readFile[res/data/raresInRaretry.json]]

    $let[rtMode;$toLowerCase[$nullish[$option[mode];$message[0];$env[userProfile;rtMode]]]]

    $if[$isNumber[$get[rtMode]]==false;
      $let[rtMode;$arrayFindIndex[$jsonEntries[$tl[data.raretryModes]];e;
        $arrayLoad[objValues;, ;$jsonValues[$env[e;1]]]
        $return[$arrayIncludes[objValues;$toTitleCase[$get[rtMode]]]]
      ]]
    ]

    $onlyIf[$arrayIncludes[modes;$get[rtMode]];
      $newError[$tl[ui.raretry.unknownMode.$get[l]]]
    ]

    $addCooldown
    $defer

    $let[al;$arrayLength[rareGroups]]
    $let[li;$math[$get[al] - 1]]
    $let[arg;$message[1]]
    $let[isDev;$checkCondition[$env[userProfile;devMode]==1]]
    $let[lastDailyRaretry;$default[$env[userProfile;limiters;lastDailyRaretry];-1]]
    $let[caughtCount;0]
    $let[color;$getGlobalVar[errorColor]]
    $let[desc;$tl[ui.raretry.nothing.$get[l]]]

    $c[targetID = category index]
    $let[targetID;$function[
      $if[$and[$get[isDev];$get[arg]!=;$isNumber[$get[arg]];$get[arg]>-1;$get[arg]<=$get[li]];
        $return[$get[arg]]
      ]
      $return[-1]
    ]]

    $jsonLoad[footer;[
      "$tl[ui.raretry.mode.$get[l];$tl[data.raretryModes.$get[rtMode].$get[l]]]"
    \\]]

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
      $let[baseChance;$env[rarities;$get[rtIndex]]]

      $let[condition;$function[
        $if[$get[targetID]==-1;
          $return[$checkCondition[$random[1;$get[baseChance]]==1]]
        ]

        $return[$checkCondition[$get[i]==$get[targetID]]]
      ]]

      $if[$get[condition];;$continue]

      $letSum[caughtCount;1]
      
      $let[animalId;$arrayRandomValue[$env[group;animalIds]]]
      $let[MC;$math[$env[rewards;$get[rtIndex]] * $arrayAt[multipliers;$get[rtMode]]]] $c[Can be 0]
      $let[image;$getAnimalVariantInfo[$get[animalId];img]]
      $let[animalDisplay;$getAnimalVariantInfo[$get[animalId];name]]
      $let[category;$tl[data.raretryCategories.$arrayAt[categories;$get[i]].$get[l]]]

      $if[$get[MC]!=0;
        $let[extraContent;\n$tl[ui.raretry.earned.$get[l];$separate[$get[MC]]]]
        $sumCash[$get[MC]]
      ]

      $let[desc;$tl[ui.raretry.gotRares.$get[l];$get[animalDisplay]]$get[extraContent]]
      
      $jsonLoad[footer;[
        "$tl[ui.raretry.rarity.$get[l];1;$separate[$get[baseChance]]]",
        "$tl[ui.raretry.category.$get[l];$get[category]]",
        "$tl[ui.raretry.mode.$get[l];$tl[data.raretryModes.$get[rtMode].$get[l]]]"
      \\]]

      $let[color;$env[group;color]]
      $delete[extraContent]

      $callFn[embed]
    ;i]


    $if[$get[caughtCount]>0;

      $if[$get[lastDailyRaretry]!=$calendarDay;
        $setUserVar[caughtRaresInRaretry;$math[$getUserVar[caughtRaresInRaretry] + $get[caughtCount]]]
        $if[$getUserVar[caughtRaresInRaretry]>=$getGlobalVar[maxRaretryRares];
          $!jsonSet[userProfile;limiters;lastDailyRaretry;$calendarDay]
          
          $setTimeout[
            $sendMessage[$channelID;
              $addTextDisplay[$tl[ui.special.caughtRares.$get[l];<@$authorID>;$getGlobalVar[maxRaretryRares];$commandName]]
            ]
          ;1s]
        ]
      ]

      $saveProfile[$env[userProfile]]
    ;
      $callFn[embed]
    ]
  `
}