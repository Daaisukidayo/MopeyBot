module.exports = [{
  name: "kingdragon",
  aliases: ["kd"],
  type: "messageCreate",
  code: `
    $reply

    $let[cdTime;2m]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
    $callFunction[cooldown;$get[cdTime]]

    ${jsons()}

    $let[luckRarity;$randomNumber[1;1001]]
    $if[$env[userProfile;devMode];
      $let[luckRarity;$randomNumber[1;5]]
    ]

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator
      $if[$get[luckRarity]==1;
        ${kdMenu('luck')}
        $let[color;d61b4a]
      ;
        ${bdMenu()}
        $let[color;$getGlobalVar[defaultColor]]
      ]
    ;$get[color]]
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["selectMenu"],
  description: "showing king dragon upgrade menu",
  code: `
    $arrayLoad[menuIDs;-;$customID]
    $let[index;$selectMenuValues]

    $let[MC;$randomNumber[1000;1501]]
    $let[successRarity;$randomNumber[1;101]]
    $let[successChance;60]

    $arrayLoad[passKeys;,;bdmenu]

    $jsonLoad[userProfile;$getUserVar[userProfile]]
    ${jsons()}

    $onlyIf[$arrayIncludes[menuIDs;$authorID];$callFunction[notYourBTN]]
    $onlyIf[$arrayEvery[passKeys;key;$arrayIncludes[menuIDs;$env[key]]]]

    $deferUpdate

    $jsonLoad[content;${deathContent()}]

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator

      $if[$get[successChance]>=$get[successRarity];
        ${kdMenu('normal')}
        $let[color;$getGlobalVar[defaultColor]]
      ; 
        $callFunction[sumMC;$get[MC]]

        $let[BD;$env[BDvar;$get[index];name] $env[BDvar;$get[index];emoji]]
        $let[content;$replace[$arrayRandomValue[content];{0};$randomNumber[1;12]]]

        $addTextDisplay[## You tried to get King Dragon as __$get[BD]__ $get[content]... Atleast you got $separateNumber[$get[MC];,]$getGlobalVar[emoji] from this run!]
        $let[color;$getGlobalVar[errorColor]]
      ]
    ;$get[color]]
    $!editMessage[$channelID;$messageID]

    $setUserVar[userProfile;$env[userProfile]]

  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["selectMenu"],
  description: "showing kingdragon final message",
  code: `
    $arrayLoad[menuIDs;-;$customID]
    $let[index;$selectMenuValues]

    $let[MC;$randomNumber[3500;5001]]
    $arrayLoad[passKeys;,;normal,kdmenu]

    $jsonLoad[userProfile;$getUserVar[userProfile]]
    ${jsons()}

    $onlyIf[$arrayIncludes[menuIDs;$authorID];$callFunction[notYourBTN]]
    $onlyIf[$arrayEvery[passKeys;key;$arrayIncludes[menuIDs;$env[key]]]]

    $deferUpdate

    $let[KD;$env[KDvar;$get[index];name] $env[KDvar;$get[index];emoji]]
    $let[color;$env[colors;$get[index]]]
    $let[thumbnail;$env[KDvar;$get[index];img]]

    $callFunction[sumMC;$get[MC]]

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator
      $addSection[
        $addTextDisplay[## You upgraded to __$get[KD]__ and you earned $separateNumber[$get[MC];,]$getGlobalVar[emoji]!]
        $addThumbnail[$get[thumbnail]]
      ]
    ;$get[color]]
    $!editMessage[$channelID;$messageID]

    $setUserVar[userProfile;$env[userProfile]]
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["selectMenu"],
  description: "showing kingdragon by luck final message",
  code: `
    $arrayLoad[menuIDs;-;$customID]

    $let[index;$selectMenuValues]
    $let[MC;250000]
    $let[color;d61b4a]

    $arrayLoad[passKeys;,;luck,kdmenu]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    ${jsons()}

    $onlyIf[$arrayIncludes[menuIDs;$authorID];$callFunction[notYourBTN]]
    $onlyIf[$arrayEvery[passKeys;key;$arrayIncludes[menuIDs;$env[key]]]]

    $deferUpdate

    $let[KD;$env[KDvar;$get[index];name] $env[KDvar;$get[index];emoji]]
    $let[color;$env[colors;$get[index]]]
    $let[thumbnail;$env[KDvar;$get[index];img]]

    $callFunction[sumMC;$get[MC]]

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator
      $addSection[
        $addTextDisplay[## You were trying to upgrade to Black Dragon, but suddenly you saw a different animal, it was __$get[KD]__ by luck in your upgrade menu! You were surprised and happy! You also earned $separateNumber[$get[MC];,]$getGlobalVar[emoji] from playing!]
        $addThumbnail[$get[thumbnail]]
      ]
      $addTextDisplay[-# Rarity: 1/1000]
    ;$get[color]]
    $!editMessage[$channelID;$messageID]

    $setUserVar[userProfile;$env[userProfile]]
  `
}]

function kdMenu(passKey) {
  return `
    $arrayLoad[kds]

    $addActionRow
    $addStringSelectMenu[kdmenu-${passKey}-$authorID;Choose an upgrade:]

    $loop[$arrayLength[KDvar];
      $let[i;$math[$env[i] - 1]]
      $jsonLoad[variant;$arrayAt[KDvar;$get[i]]]

      $let[vCode;$env[variant;vCode]]
      $let[name;$env[variant;name]]
      $let[emoji;$env[variant;emoji]]

      $let[showSeasonal;$includes["$get[vCode]";"s1";"s2"]]
      $let[showLocked;$and[$env[userProfile;userPacks;lockedSP];$get[vCode]==lsp]]
      $let[showStorefront;$and[$env[userProfile;userPacks;storefrontSP];$get[vCode]==sfsp]]
      $let[showGolden;$and[$env[userProfile;userPacks;goldenSP];$get[vCode]==gsp]]

      $let[showOption;$or[$get[showSeasonal];$get[showLocked];$get[showStorefront];$get[showGolden]]]

      $if[$get[showOption];
        $arrayPush[kds;$get[emoji]]
        $addOption[$get[name];;$get[i];$get[emoji]]
      ]
    ;i;true]
  `
}

function bdMenu() {
  return `
    $arrayLoad[bds]

    $addActionRow
    $addStringSelectMenu[bdmenu-$authorID;Choose an upgrade:]

    $loop[$arrayLength[BDvar];
      $let[i;$math[$env[i] - 1]]
      $jsonLoad[variant;$arrayAt[BDvar;$get[i]]]

      $let[vCode;$env[variant;vCode]]
      $let[name;$env[variant;name]]
      $let[emoji;$env[variant;emoji]]

      $let[showSeasonal;$includes["$get[vCode]";"s1";"s2"]]
      $let[showLocked;$and[$env[userProfile;userPacks;lockedSP];$get[vCode]==lsp]]
      $let[showGolden;$and[$env[userProfile;userPacks;goldenSP];$get[vCode]==gsp]]
      $let[showLegacy;$and[$env[userProfile;userPacks;legacySP];$get[vCode]==legacy]]

      $let[showOption;$or[$get[showSeasonal];$get[showLocked];$get[showGolden];$get[showLegacy]]]

      $if[$get[showOption];
        $arrayPush[bds;$get[emoji]]
        $addOption[$get[name];;$get[i];$get[emoji]]
      ]
    ;i;true]
  `
}

function jsons() {
  return `
    $jsonLoad[animals;$readFile[json/animals.json]]
    $jsonLoad[userPacks;$env[userProfile;userPacks]]
    $jsonLoad[BDvar;$env[animals;blackDragon;variants]]
    $jsonLoad[KDvar;$env[animals;kingDragon;variants]]
    $arrayLoad[colors; ;24272b 24272b 731C1F 9D3F0E 6E141A 5EB2FF B62323 DDAF02 f63413]
  `
}

function deathContent() {
  return `
    [
      "but you got killed by teamers",
      "but your internet fell off and you disconnected with {0} apexes away",
      "but Mistik made an event so you lost your BD",
      "but rares bullied and killed you",
      "But you died by low lava"
    \\]
  `
}