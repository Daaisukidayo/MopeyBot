export default [{
  name: "kingdragon",
  aliases: ["kd"],
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown[2m]

    ${loadJSON()}

    $let[luckRarity;$random[1;1000]]

    $if[$and[$env[userProfile;devMode]==1;$message!=];
      $let[luckRarity;$message]
    ]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.kingdragon.chooseUpgrade]]
      $if[$get[luckRarity]==1;
        ${addButtons('rareKingDragon')}
        $let[color;$getGlobalVar[rareKingDragonColor]]
      ;
        ${addButtons('blackDragon')}
        $let[color;$getGlobalVar[defaultColor]]
      ]
    ;$get[color]]

    $newTimeout[kingdragon-$authorID;$getGlobalVar[kingDragonTT];$sendMessage[$channelID;;true]]
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["button"],
  description: "showing king dragon upgrade menu",
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;blackDragonButton]
    $onlyIf[$arrayEvery[passKeys;key;$arrayIncludes[IID;$env[key]]]]

    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    ${loadJSON()}

    $let[index;$env[IID;0]]
    $let[MC;1500]
    $let[successRarity;$random[1;100]]
    $let[successChance;60]

    $addContainer[
      $addAuthorDisplay
      
      $if[$get[successChance]>=$get[successRarity];
        $addTextDisplay[$tl[ui.kingdragon.chooseUpgrade]]
        ${addButtons('kingDragon')}
        $let[color;$getGlobalVar[defaultColor]]
        $newTimeout[kingdragon-$authorID;$getGlobalVar[kingDragonTT]]
      ; 
        $sumCash[$get[MC]]
        $saveProfile

        $let[BD;$env[blackDragonVars;$get[index];emoji]]
        $let[reason;$advArrayRandomValue[$tl[ui.kingdragon.reasons;$random[0;12]]]]
        $let[content;$tl[ui.kingdragon.attempt;$get[BD];$get[reason];$separate[$get[MC]]]]

        $addTextDisplay[$get[content]]
        $let[color;$getGlobalVar[errorColor]]

        $!stopTimeout[kingdragon-$authorID]
      ]
    ;$get[color]]

    $interactionUpdate
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["button"],
  description: "showing kingdragon final message",
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;kingDragonButton]
    $onlyIf[$arrayEvery[passKeys;key;$arrayIncludes[IID;$env[key]]]]

    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $let[index;$env[IID;0]]
    ${loadJSON()}
    ${KDVars()}

    $let[MC;5000]
    $sumCash[$get[MC]]
    $saveProfile

    $addContainer[
      $addAuthorDisplay
      $addSection[
        $addTextDisplay[$tl[ui.kingdragon.upgrade;$get[displayKD];$separate[$get[MC]]]]
        $addThumbnail[$get[thumbnail]]
      ]
    ;$get[color]]

    $interactionUpdate
    $!stopTimeout[kingdragon-$authorID]
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["button"],
  description: "showing kingdragon by luck final message",
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;rareKingDragonButton]
    $onlyIf[$arrayEvery[passKeys;key;$arrayIncludes[IID;$env[key]]]]

    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    ${loadJSON()}
    $let[index;$env[IID;0]]
    ${rareKDVars()}
    $let[color;$getGlobalVar[rareKingDragonColor]]
    $let[MC;250000]

    $sumCash[$get[MC]]
    $saveProfile

    $addContainer[
      $addAuthorDisplay
      $addSection[
        $addTextDisplay[$tl[ui.kingdragon.byLuckUpgrade;$get[displayKD];$separate[$get[MC]]]]
        $addThumbnail[$get[thumbnail]]
      ]
      $addTextDisplay[$tl[ui.kingdragon.rarity;$env[rareKingDragonRarity;0];$env[rareKingDragonRarity;1]]]
    ;$get[color]]

    $interactionUpdate
    $!stopTimeout[kingdragon-$authorID]
  `
}]

function KDVars() {
  return `
    $let[displayKD;$env[kingDragonVars;$get[index];name]]
    $let[color;$env[colors;$get[index]]]
    $let[thumbnail;$env[kingDragonVars;$get[index];img]]
  `
}

function rareKDVars() {
  return `
    $let[displayKD;$env[rareKingDragonVars;$get[index];name]]
    $let[color;$env[colors;$get[index]]]
    $let[thumbnail;$env[rareKingDragonVars;$get[index];img]]
  `
}

function addButtons(animalID) {
  return `
    $let[btns;0]
    $loop[$arrayLength[${animalID}Vars];
      $let[i;$math[$env[i] - 1]]
      $jsonLoad[variant;$arrayAt[${animalID}Vars;$get[i]]]

      $let[packId;$env[variant;packId]]
      $let[name;$env[variant;name]]
      $let[emoji;$env[variant;emoji]]

      $if[$arrayIncludes[userPacksKeys;$get[packId]];;$continue]

      $if[$math[$get[btns]%3]==0;
        $addActionRow
      ]
      $addButton[$get[i]-${animalID}Button-$authorID;$get[name];Secondary;$get[emoji]]
      $letSum[btns;1]
    ;i;true]
  `
}

function loadJSON() {
  return `
    $jsonLoad[animals;$getAnimalsData]
    $jsonLoad[animalIndexes;$getGlobalVar[animalIndexes]]
    $jsonLoad[userPacksKeys;$env[userProfile;userPacks]]
    $arrayUnshift[userPacksKeys;s1;s2]
    $jsonLoad[blackDragonVars;$env[animals;$env[animalIndexes;blackDragon];variants]]
    $jsonLoad[kingDragonVars;$env[animals;$env[animalIndexes;kingDragon];variants]]
    $jsonLoad[rareKingDragonVars;$env[animals;$env[animalIndexes;rareKingDragon];variants]]
    $jsonLoad[rareKingDragonRarity;$env[animals;$env[animalIndexes;rareKingDragon];rarity]]
    $jsonLoad[colors;$getGlobalVar[kingDragonColors]]
  `
}