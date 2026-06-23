export default {
  name: 'handleRaretrysimulator',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile

    $jsonLoad[modes;$getGlobalVar[raretryModes]]
    $jsonLoad[allLocales;$jsonKeys[$getGlobalVar[allLocales]]]

    $let[attempts;$toLowerCase[$nullish[$option[attempts];$message[0];100]]]
    $if[$isNumber[$get[attempts]]==false;
      $loop[$arrayLength[allLocales];
        $let[locale;$arrayAt[allLocales;$math[$env[i] - 1]]]
        $let[localeMax;$tl[ui.special.maximum.$get[locale]]]

        $if[$get[attempts]==$get[localeMax]==false;$continue]

        $let[attempts;$replace[$get[attempts];$get[localeMax];$getGlobalVar[maxRtsimAttempts]]]
        $break
      ;i;true]
    ]
    
    $let[rtMode;$nullish[$option[mode];$message[1];$env[userProfile;rtMode]]]

    $if[$isNumber[$get[rtMode]]==false;
      $let[rtMode;$arrayFindIndex[$jsonEntries[$tl[data.raretryModes]];e;
        $arrayLoad[objValues;, ;$jsonValues[$env[e;1]]]
        $return[$arrayIncludes[objValues;$toTitleCase[$get[rtMode]]]]
      ]]
    ]

    $onlyIf[$and[$isNumber[$get[attempts]];$inRange[$get[attempts];1;$getGlobalVar[maxRtsimAttempts]]];
      $newError[$tl[ui.raretrysimulator.invalidNumber.$get[l]]]
    ]

    $onlyIf[$arrayIncludes[modes;$get[rtMode]];
      $arrayMap[modes;m;
        $return[$tl[data.raretryModes.$env[m].$get[l]]]
      ;modeList]
      $newError[$tl[ui.raretrysimulator.invalidMode.$get[l];$arrayJoin[modeList;\`, \`]]]
    ]

    $addCooldown
    $defer
    
    $jsonLoad[categories;$getGlobalVar[raretryCategories]]
    $jsonLoad[rarities;$getGlobalVar[raretryRarities]]
    $jsonLoad[rareGroups;$readFile[res/data/raresInRaretry.json]]
    $jsonLoad[result;{}]

    $arrayForEach[categories;category;
      $!jsonSet[result;$env[category];{
        "rarity": [\\],
        "map": {}
      }]
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

        $return[# _\`$tl[data.raretryCategories.$env[entry;0].$get[l]] ($env[entry;1;rarity;0]/$env[entry;1;rarity;1])\`_\n## $arrayJoin[contentInEntries; ]]
      ]
    ;content]


    $addContainer[
      $addAuthorDisplay

      $addTextDisplay[$tl[ui.raretrysimulator.title.$get[l]]]
    
      $addSeparator
      $addTextDisplay[$if[$arrayLength[content]>0;$arrayJoin[content;\n];$tl[ui.raretrysimulator.empty.$get[l]]]]
      $addSeparator
      $addTextDisplay[$tl[ui.raretrysimulator.attempts.$get[l];$get[attempts]]]
      $addTextDisplay[$tl[ui.raretrysimulator.mode.$get[l];$tl[data.raretryModes.$get[rtMode].$get[l]]]]

    ;$getGlobalVar[luckyColor]]
  `
}