export default {
  name: 'handleRaretrysimulator',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile

    $jsonLoad[modes;$getGlobalVar[raretryModes]]
    $jsonLoad[allLocales;$jsonEntries[$getGlobalVar[allLocales]]]

    $let[attempts;$toLowerCase[$nullish[$option[attempts];$message[0];100]]]
    $if[$isNumber[$get[attempts]]==false;
      $loop[$arrayLength[allLocales];
        $let[i;$math[$env[i] - 1]]
        $let[locale;$env[allLocales;$get[i];0]]
        $let[localeMax;$tl[$get[locale];ui;special.maximum]]
        $if[$get[attempts]==$get[localeMax];;$continue]

        $let[attempts;$replace[$get[attempts];$get[localeMax];$getGlobalVar[maxRtsimAttempts]]]
        $break
      ;i;true]
    ]
    
    $let[rtMode;$nullish[$option[mode];$message[1];$env[userProfile;rtMode]]]

    $if[$isNumber[$get[rtMode]]==false;
      $jsonLoad[rtModes;$tl[*;data;raretryModes]]
      $jsonLoad[rtModeE;$jsonEntries[rtModes]]
      $let[rtMode;$arrayFindIndex[rtModeE;e;
        $jsonLoad[obj;$env[e;1]]
        $arrayLoad[objValues;, ;$jsonValues[obj]]
        $return[$arrayIncludes[objValues;$toTitleCase[$get[rtMode]]]]
      ]]
    ]

    $onlyIf[$and[$isNumber[$get[attempts]];$inRange[$get[attempts];1;$getGlobalVar[maxRtsimAttempts]]];
      $newError[$tl[$get[l];ui;raretrysimulator.invalidNumber]]
    ]

    $onlyIf[$arrayIncludes[modes;$get[rtMode]];
      $arrayMap[modes;m;
        $return[$tl[$get[l];data;raretryModes.$env[m]]]
      ;modeList]
      $newError[$tl[$get[l];ui;raretrysimulator.invalidMode;$arrayJoin[modeList;\`, \`]]]
    ]

    $addCooldown
    $defer
    
    $jsonLoad[categories;$getGlobalVar[raretryCategories]]
    $jsonLoad[rarities;$getGlobalVar[raretryRarities]]
    $jsonLoad[rareGroups;$readFile[res/data/raresInRaretry.json]]
    $jsonLoad[result;{}]

    $arrayForEach[categories;category;
      $jsonLoad[data;{}]
      $!jsonSet[data;rarity;[\\]]
      $!jsonSet[data;map;{}]
      $!jsonSet[result;$env[category];$env[data]]
    ]

    $loop[$get[attempts];

      $loop[$arrayLength[rareGroups];
        $let[i;$math[$env[i] - 1]]

        $let[rtIndex;$math[$get[i] + $get[rtMode]]]
        $let[baseChance;$env[rarities;$get[rtIndex]]]

        $if[$random[1;$get[baseChance]]!=1;$continue]

        $arrayLoad[rarity; ;1 $get[baseChance]]
        $let[animalId;$arrayRandomValue[$env[rareGroups;$get[i];animalIds]]]
        $let[category;$arrayAt[categories;$get[i]]]

        $let[current;$default[$env[result;$get[category];map;$get[animalId]];0]]
        $letSum[current;1]

        $!jsonSet[result;$get[category];map;$get[animalId];$get[current]]
        $if[$arrayLength[$env[result;$get[category];rarity]]==0;
          $!jsonSet[result;$get[category];rarity;$env[rarity]]
        ]
      ;i]
    ]

    $arrayMap[$jsonEntries[result];entry;
      $jsonLoad[mapEntries;$jsonEntries[$env[entry;1;map]]]

      $if[$arrayLength[mapEntries]>0;
        $arrayMap[mapEntries;kv;
          $return[$getAnimalVariantInfo[$env[kv;0];emoji]\`$env[kv;1]\`]
        ;contentInEntries]

        $return[# _\`$tl[$get[l];data;raretryCategories.$env[entry;0]] ($env[entry;1;rarity;0]/$env[entry;1;rarity;1])\`_\n## $arrayJoin[contentInEntries; ]]
      ]
    ;content]


    $addContainer[
      $addAuthorDisplay

      $addTextDisplay[$tl[$get[l];ui;raretrysimulator.title]]
    
      $addSeparator
      $addTextDisplay[$if[$arrayLength[content]>0;$arrayJoin[content;\n];$tl[$get[l];ui;raretrysimulator.empty]]]
      $addSeparator
      $addTextDisplay[$tl[$get[l];ui;raretrysimulator.attempts;$get[attempts]]]
      $addTextDisplay[$tl[$get[l];ui;raretrysimulator.mode;$tl[$get[l];data;raretryModes.$get[rtMode]]]]

    ;$getGlobalVar[luckyColor]]
  `
}