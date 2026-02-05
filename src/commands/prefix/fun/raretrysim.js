export default { 
  name: "raretrysimulator", 
  aliases: ["rtsim"], 
  type: "messageCreate", 
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile

    $jsonLoad[raretryVarData;$getGlobalVar[raretryVarData]]
    $jsonLoad[categories;$env[raretryVarData;categories]]
    $jsonLoad[modes;$env[raretryVarData;modes]]
    $jsonLoad[rareGroups;$readFile[src/json/raresInRaretry.json]]

    $let[attempts;$default[$message[0];100]]
    $let[rtMode;$default[$message[1];0]]

    $if[$isNumber[$get[rtMode]]==false;
      $jsonLoad[rtModes;$tl[data.raretryModes]]
      $arrayLoad[rtModeV;, ;$jsonValues[rtModes]]
      $let[rtMode;$arrayIndexOf[rtModeV;$toTitleCase[$get[rtMode]]]]
    ]

    $onlyIf[$and[$isNumber[$get[attempts]];$inRange[$get[attempts];1;1000]];
      $newError[$tl[ui.raretrysimulator.invalidNumber]]
    ]

    $onlyIf[$arrayIncludes[modes;$get[rtMode]];
      $arrayMap[modes;m;
        $return[$tl[data.raretryModes.$env[m]]]
      ;modeList]
      $newError[$tl[ui.raretrysimulator.invalidMode;$arrayJoin[modeList;\`, \`]]]
    ]

    $addCooldown[10s]

    $jsonLoad[result;{}]

    $arrayForEach[categories;category;
      $jsonLoad[data;{}]
      $!jsonSet[data;rarity;\\[\\]]
      $!jsonSet[data;map;{}]
      $!jsonSet[result;$env[category];$env[data]]
    ]

    $loop[$get[attempts];

      $loop[$arrayLength[rareGroups];
        $let[i;$math[$env[i] - 1]]

        $let[rtIndex;$math[$get[i] + $get[rtMode]]]
        $let[baseChance;$env[raretryVarData;rarities;$get[rtIndex]]]

        $if[$random[1;$get[baseChance]]!=1;$continue]

        $arrayLoad[rarity; ;1 $get[baseChance]]
        $let[animalID;$advArrayRandomValue[$env[rareGroups;$get[i];animalIDs]]]
        $let[category;$arrayAt[categories;$get[i]]]

        $let[current;$default[$env[result;$get[category];map;$get[animalID]];0]]
        $letSum[current;1]

        $!jsonSet[result;$get[category];map;$get[animalID];$get[current]]
        $if[$advArrayLength[$env[result;$get[category];rarity]]==0;
          $!jsonSet[result;$get[category];rarity;$env[rarity]]
        ]
      ;i]
    ]

    $jsonLoad[resultEntries;$jsonEntries[result]]
    $arrayMap[resultEntries;entry;
      $jsonLoad[mapEntries;$advJsonEntries[$env[entry;1;map]]]

      $if[$arrayLength[mapEntries]>0;
        $arrayMap[mapEntries;kv;
          $return[$getAnimalVariantInfo[$env[kv;0];emoji]\`$env[kv;1]\`]
        ;contentInEntries]

        $return[# _\`$tl[data.raretryCategories.$env[entry;0]] ($env[entry;1;rarity;0]/$env[entry;1;rarity;1])\`_\n## $arrayJoin[contentInEntries; ]]
      ]
    ;content]


    $addContainer[
      $addAuthorDisplay

      $addTextDisplay[$tl[ui.raretrysimulator.title]]
    
      $addSeparator
      $addTextDisplay[$if[$arrayLength[content]>0;$arrayJoin[content;\n];$tl[ui.raretrysimulator.empty]]]
      $addSeparator
      $addTextDisplay[$tl[ui.raretrysimulator.attempts;$get[attempts]]]
      $addTextDisplay[$tl[ui.raretrysimulator.mode;$tl[data.raretryModes.$get[rtMode]]]]

    ;$getGlobalVar[luckyColor]]
  `
}