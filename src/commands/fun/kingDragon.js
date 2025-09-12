import universalSnippets from '#snippets/universalSnippets.js'

export default [{
  name: "kingdragon",
  aliases: ["kd"],
  type: "messageCreate",
  code: `
    $reply
    ${universalSnippets.checkProfile({time: '2m'})}

    ${loadJSON()}

    $let[luckRarity;$randomNumber[1;1001]]
    $if[$env[userProfile;devMode];
      $let[luckRarity;$default[$message;$get[luckRarity]]]
    ]

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator
      $if[$get[luckRarity]==1;
        ${addSelectMenu('kingDragon','-luck')}
        $let[color;$getGlobalVar[kingDragonByLuckColor]]
      ;
        ${addSelectMenu('blackDragon')}
        $let[color;$getGlobalVar[defaultColor]]
      ]
    ;$get[color]]
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["selectMenu"],
  description: "showing king dragon upgrade menu",
  code: `
    $arrayLoad[interactionID;-;$customID]
    $arrayLoad[passKeys;,;blackDragonMenu]

    ${universalSnippets.loadProfile()}

    $onlyIf[$arrayEvery[passKeys;key;$arrayIncludes[interactionID;$env[key]]]]
    $onlyIf[$arrayIncludes[interactionID;$authorID];$callFunction[notYourBTN]]

    $jsonLoad[content;${deathContent()}]
    ${loadJSON()}

    $let[index;$selectMenuValues]
    $let[MC;$randomNumber[1000;1501]]
    $let[successRarity;$randomNumber[1;101]]
    $let[successChance;60]

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator

      $if[$get[successChance]>=$get[successRarity];
        ${addSelectMenu('kingDragon','-normal')}
        $let[color;$getGlobalVar[defaultColor]]
      ; 
        $callFunction[sumMC;$get[MC]]

        $let[BD;$env[blackDragonVars;$get[index];name] $env[blackDragonVars;$get[index];emoji]]
        $let[content;$replace[$arrayRandomValue[content];{0};$randomNumber[1;12]]]

        $addTextDisplay[## You tried to get King Dragon as __$get[BD]__ $get[content]... Atleast you got $separateNumber[$get[MC];,]$getGlobalVar[emoji] from this run!]
        $let[color;$getGlobalVar[errorColor]]
      ]
    ;$get[color]]

    $interactionUpdate
    $setUserVar[userProfile;$env[userProfile]]
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["selectMenu"],
  description: "showing kingdragon final message",
  code: `
    $arrayLoad[interactionID;-;$customID]
    $arrayLoad[passKeys;,;normal,kingDragonMenu]

    ${universalSnippets.loadProfile()}

    $onlyIf[$arrayEvery[passKeys;key;$arrayIncludes[interactionID;$env[key]]]]
    $onlyIf[$arrayIncludes[interactionID;$authorID];$callFunction[notYourBTN]]

    $let[index;$selectMenuValues]
    ${loadJSON()}
    ${kdVariables()}

    $let[MC;$randomNumber[3500;5001]]
    $callFunction[sumMC;$get[MC]]

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator
      $addSection[
        $addTextDisplay[## You upgraded to __$get[KD]__ and you earned $separateNumber[$get[MC];,]$getGlobalVar[emoji]!]
        $addThumbnail[$get[thumbnail]]
      ]
    ;$get[color]]

    $interactionUpdate
    $setUserVar[userProfile;$env[userProfile]]
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["selectMenu"],
  description: "showing kingdragon by luck final message",
  code: `
    $arrayLoad[interactionID;-;$customID]
    $arrayLoad[passKeys;,;luck,kingDragonMenu]
    ${universalSnippets.loadProfile()}

    $onlyIf[$arrayEvery[passKeys;key;$arrayIncludes[interactionID;$env[key]]]]
    $onlyIf[$arrayIncludes[interactionID;$authorID];$callFunction[notYourBTN]]

    ${loadJSON()}
    $let[index;$selectMenuValues]
    ${kdVariables()}
    $let[color;$getGlobalVar[kingDragonByLuckColor]]
    $let[MC;250000]

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

    $interactionUpdate
    $setUserVar[userProfile;$env[userProfile]]
  `
}]

function kdVariables() {
  return `
    $let[KD;$env[kingDragonVars;$get[index];name] $env[kingDragonVars;$get[index];emoji]]
    $let[color;$env[colors;$get[index]]]
    $let[thumbnail;$env[kingDragonVars;$get[index];img]]
  `
}

function addSelectMenu(animalID, passKey = '') {
  return `
    $addActionRow
    $addStringSelectMenu[${animalID}Menu${passKey}-$authorID;Choose an upgrade:]

    $loop[$arrayLength[${animalID}Vars];
      $let[i;$math[$env[i] - 1]]
      $jsonLoad[variant;$arrayAt[${animalID}Vars;$get[i]]]

      $let[vCode;$env[variant;vCode]]
      $let[name;$env[variant;name]]
      $let[emoji;$env[variant;emoji]]

      $if[$arrayIncludes[userPacksKeys;$get[vCode]];;$continue]

      $addOption[$get[name];;$get[i];$get[emoji]]
    ;i;true]
  `
}

function loadJSON() {
  return `
    $jsonLoad[animals;$readFile[src/json/animals.json]]
    $jsonLoad[animalsIndexes;$getGlobalVar[animalsIndexes]]
    $jsonLoad[userPacksKeys;$env[userProfile;userPacks]]
    $arrayPush[userPacksKeys;s1;s2]
    $jsonLoad[blackDragonVars;$env[animals;$env[animalsIndexes;blackDragon];variants]]
    $jsonLoad[kingDragonVars;$env[animals;$env[animalsIndexes;kingDragon];variants]]
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