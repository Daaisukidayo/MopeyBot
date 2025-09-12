export default {
  loadProfile(id = '$authorID') { return `$jsonLoad[userProfile;$getUserVar[userProfile;${id}]]` },

  settingTagsContent(defaultArrayName = 'tags', newArrayName = 'tagsContent') {
    return `
      $if[$arrayLength[${defaultArrayName}]!=0;
        $arrayMap[${defaultArrayName};tag;
          $return[$env[allLobbyTagsContent;$env[tag]]]
        ;${newArrayName}]
      ;
        $arrayLoad[${newArrayName}; ;None]
      ]
    `
  },

  cooldownEmbed() {
    return `
      $jsonLoad[l;$readFile[src/json/localizations.json]]
      $let[language;$env[userProfile;language]]

      $let[content1;$default[$env[l;cooldown;0;$get[language]];???]]
      $let[content2;$default[$advancedReplace[$env[l;cooldown;1;$get[language]];{0};$get[relativeTimeLeft];{1};$get[longDateTime]];???]]

      $getGlobalVar[author]
      $title[$get[content1]]
      $description[$get[content2]]
      $color[$getGlobalVar[cooldownColor]]
    `
  },

  cooldownSchema(commandName) {
    return `
      $let[time;$getUserCooldownTime[${commandName}]]
      $let[cooldownEnd;$sum[$getTimestamp;$get[time]]]
      $let[longDateTime;$discordTimestamp[$get[cooldownEnd];LongDateTime]]
      $let[relativeTimeLeft;$discordTimestamp[$get[cooldownEnd];RelativeTime]]

      $if[$or[$get[time]>30000;$get[time]==0];
        $let[deleteTime;10000]
      ;
        $let[deleteTime;$get[time]]
      ]

      ${this.cooldownEmbed()}
      $deleteIn[$get[deleteTime]]
    `
  },

  checkProfile({ time = 0, addCooldown = true } = {}) {
    return `
      ${this.loadProfile()}
      $if[$env[userProfile;devMode];;
        $onlyIf[$getGlobalVar[botEnabled]]
      ]
      $onlyIf[$env[userProfile;isBanned]!=true]
      $onlyIf[$env[userProfile;acceptedRules];${this.rulesSchema()}]
      $onlyIf[$env[userProfile;onSlowmode]!=true]
      $if[${addCooldown}; 
        $if[$env[userProfile;devMode];;
          $userCooldown[$commandName;${time};${this.cooldownSchema('$commandName')}]
        ]
      ]
    `
  },

  rulesSchema() {
    return `
      $author[Hey, $userDisplayName!;$userAvatar]
      $title[It looks like you haven't accepted the rules yet!]
      $description[### By clicking on "Accept" button, you confirm that you have read and agree to the following important documents:
      # $hyperlink[Information;https://github.com/Daaisukidayo/MopeyBot/blob/main/README.md]
      # $hyperlink[Terms of Service;https://github.com/Daaisukidayo/MopeyBot/blob/main/Mopey's_TOS.md]
      # $hyperlink[Privacy Policy;https://github.com/Daaisukidayo/MopeyBot/blob/main/Mopey's_TOS.md#-privacy-policy]
      # $hyperlink[Rules;https://github.com/Daaisukidayo/MopeyBot/blob/main/Rules.md]]
      $color[$getGlobalVar[cooldownColor]]

      $addActionRow
      $addButton[acceptrules-$authorID;Accept;Success;✅]
      $addButton[declinerules-$authorID;Decline;Danger;🛑]
    `
  },

  luckGenerator(raresGroupKey) {
    return `
      $jsonLoad[allRareAttemptsInfo;{}]
      $jsonLoad[rareGroups;${raresGroupKey}]

      $arrayForEach[rareGroups;groupConfig;
        $arrayLoad[groupParts;|;$env[groupConfig]]
        $let[keyName;$env[groupParts;0]]
        $let[commonAnimal;$env[groupParts;1]]
        $let[tier;$env[animals;$env[animalsIndexes;$get[keyName]];tier]]
        $let[totalAttempts;$env[animals;$env[animalsIndexes;$env[groupParts;2]];rarity;1]]

        $let[totalRare;0]
        $arrayCreate[rarePool;0]

        $loop[$math[$arrayLength[groupParts] - 2];
          $let[ri;$math[$env[ri] + 1]]
          $let[rareAnimal;$env[groupParts;$get[ri]]]
          $let[countRare;$env[animals;$env[animalsIndexes;$get[rareAnimal]];rarity;0]]

          $if[$get[countRare]!=;
            $arrayCreate[oneRareArr;$get[countRare]]
            $arrayFill[oneRareArr;$get[rareAnimal]]
            $arrayConcat[rarePool;rarePool;oneRareArr]
            $letSum[totalRare;$get[countRare]]
          ]
        ;ri;true]

        $let[totalCommons;$math[$get[totalAttempts] - $get[totalRare]]]
        $arrayCreate[commonArr;$get[totalCommons]]
        $arrayFill[commonArr;$get[commonAnimal]]

        $arrayConcat[fullAttemptArr;rarePool;commonArr]
        $arrayShuffle[fullAttemptArr]

        $!jsonSet[allRareAttemptsInfo;$get[keyName];$env[fullAttemptArr]]
      ]
    `
  },
}
