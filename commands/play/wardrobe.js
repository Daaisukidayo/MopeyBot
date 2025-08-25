export default [{
  name: "wardrobe", 
  aliases: ["wr"], 
  type: "messageCreate", 
  code: `
    $reply
    $let[cdTime;10s]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
    $callFunction[cooldown;$get[cdTime]]

    $let[arg;$replace[$toCamelCase[$message];-;]]

    $onlyIf[$get[arg]!=;
      $callFunction[embed;error]
      $description[## Usage: \`$getGuildVar[prefix]wardrobe {new|all|<tier>|<animal>}\`]
    ]

    ${json()}

    $if[$get[arg]==new;
      $let[animalID;mouse]
      ${embed('new')}
    ;
      $if[$get[arg]==all;
        $callFunction[embed;default]
        $description[# Choose a skinpack]
        ${menu("all")}
      ;
        $if[$isNumber[$get[arg]];
          $callFunction[embed;default]
          $description[# Choose a skinpack]
          ${menu("$get[arg]")}
        ;
          $onlyIf[$arrayIncludes[animalsNames;$get[arg]];
            $callFunction[embed;error]
            $description[## Animal not found]
          ]

          $let[animalID;$get[arg]]
          ${embed('animal')}
        ]
      ]
    ]
  `
},{
  type: "interactionCreate", 
  allowedInteractionTypes: ["selectMenu"],
  description: "if user's argument is new",
  code: `
    $arrayLoad[interactionID;-;$customID]
    $arrayLoad[values;-;$selectMenuValues]
    $arrayLoad[passKeys;,;new,wardrobe]
    $let[animalID;$env[values;0]]
    $let[variant;$env[values;1]]
    
    $onlyIf[$arrayEvery[passKeys;key;$arrayIncludes[interactionID;$env[key]]]]

    $jsonLoad[userProfile;$getUserVar[userProfile]]
    ${json()}
    $onlyIf[$arrayIncludes[interactionID;$authorID];$callFunction[notYourBTN]]
    $onlyIf[$arrayFindIndex[animals;animalObj;$get[animalID]==$env[animalObj;ID]]!=-1]

    $let[msg;$messageID]

    $!jsonSet[userWardrobe;$get[animalID];$get[variant]]
    $setUserVar[userWardrobe;$env[userWardrobe]]        

    $let[i;$arrayIndexOf[animalsNames;$get[animalID]]]
    $letSum[i;1]
    $let[animalID;$arrayAt[animalsNames;$get[i]]]

    $loop[-1;
      $if[$env[animals;$env[animalsIndexes;$get[animalID]];variants;1]==;;$break]
      $letSum[i;1]
      $let[animalID;$arrayAt[animalsNames;$get[i]]]
    ]

    $if[$get[animalID]==;
      $interactionUpdate[# You equipped all skins!]
      $stop
    ]

    ${embed('new')}
    $interactionUpdate
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["selectMenu"],
  description: "if user choses skinpack providing number as an argument",
  code: `
    $arrayLoad[interactionID;-;$customID]
    $let[tier;$env[interactionID;0]]
    
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $onlyIf[$isNumber[$get[tier]]]
    $onlyIf[$arrayIncludes[interactionID;wardrobe]]
    $onlyIf[$arrayIncludes[interactionID;$authorID];$callFunction[notYourBTN]]

    ${json()}
    $let[value;$selectMenuValues]

    $loop[$arrayLength[animalsNames];
      $let[i;$math[$env[i] - 1]]
      $let[animalID;$arrayAt[animalsNames;$get[i]]]
      $let[animalTier;$env[animals;$env[animalsIndexes;$get[animalID]];tier]]

      $if[$get[animalTier]>$get[tier];$break]
      $if[$get[animalTier]!=$get[tier];$continue]

      $jsonLoad[variants;$env[animals;$env[animalsIndexes;$get[animalID]];variants]]

      $loop[$arrayLength[variants];
        $let[j;$math[$env[j] - 1]]
        $jsonLoad[variant;$arrayAt[variants;$get[j]]]
        $let[description;$env[variant;description]]
        $let[emoji;$env[variant;emoji]]

        $if[$includes[$get[description];$get[value]];;$continue]

        $!jsonSet[userWardrobe;$get[animalID];$get[j]]
        $arrayPush[content;$get[emoji]]

        $break
      ;j;true]
    ;i;true]

    $let[desc;$arrayJoin[content; ]]

    $callFunction[embed;default]
    $if[$get[desc]!=;
      $setUserVar[userWardrobe;$env[userWardrobe]]
      $description[# $get[desc]]
      $title[You have successfully equipped every tier \`$get[tier]\` animal with chosen Skin Pack!]
    ;
      $color[Orange]
      $title[Every tier \`$get[tier]\` animal don't have any skins in chosen Skin Pack]
    ]
    $interactionUpdate
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["selectMenu"],
  description: "if user choses skinpack providing all as an argument",
  code: `
    $arrayLoad[interactionID;-;$customID]
    $arrayLoad[passKeys;,;all,wardrobe]

    $onlyIf[$arrayEvery[passKeys;key;$arrayIncludes[interactionID;$env[key]]]]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $onlyIf[$arrayIncludes[interactionID;$authorID];$callFunction[notYourBTN]]

    ${json()}
    $let[value;$selectMenuValues]

    $arrayForEach[animalsNames;animal;
      $jsonLoad[allVariants;$env[animals;$env[animalsIndexes;$env[animalID]];variants]]

      $loop[$arrayLength[allVariants];
        $let[i;$math[$env[i] - 1]]
        $jsonLoad[variant;$arrayAt[allVariants;$get[i]]]
        $let[description;$env[variant;description]]

        $if[$includes[$get[description];$get[value]];;$continue]

        $!jsonSet[userWardrobe;$env[animalID];$get[i]]

        $break
      ;i;true]
    ]
    $setUserVar[userWardrobe;$env[userWardrobe]]

    $callFunction[embed;default]
    $title[You have successfully equipped every animal with chosen Skin Pack!]
    $interactionUpdate
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["selectMenu"],
  description: "if user choses skinpack providing animal as an argument",
  code: `
    $arrayLoad[interactionID;-;$customID]
    $arrayLoad[values;-;$selectMenuValues]
    $arrayLoad[passKeys;,;animal,wardrobe]
    $let[animalID;$env[values;0]]
    $let[variant;$env[values;1]]

    $onlyIf[$arrayEvery[passKeys;key;$arrayIncludes[interactionID;$env[key]]]]

    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $onlyIf[$arrayIncludes[interactionID;$authorID];$callFunction[notYourBTN]]
    ${json()}
    $onlyIf[$arrayFindIndex[animals;animalObj;$get[animalID]==$env[animalObj;ID]]!=-1]

    $let[msg;$messageID]

    $!jsonSet[userWardrobe;$get[animalID];$get[variant]]
    $setUserVar[userWardrobe;$env[userWardrobe]]

    ${embed('$get[animalID]')}
    $interactionUpdate
    $!clearTimeout[WARDROBE-$authorID]
    ${timeout()}
  `
}]


// Functions

function timeout() {
  return `
    $setTimeout[
      $!deleteMessage[$channelID;$get[msg]]
    ;1m;WARDROBE-$authorID]
  `
}

function newMenu(id) {
  return `
    $addActionRow
    $addStringSelectMenu[${id}-wardrobe-$authorID;Choose a skin:]

    $loop[25;

      $let[i;$math[$env[i] - 1]] 

      $if[$env[animals;$env[animalsIndexes;$get[animalID]];variants;$get[i]]!=;;$break]

      $let[animalVarCode;$env[animals;$env[animalsIndexes;$get[animalID]];variants;$get[i];vCode]]

      $arrayForEach[userSPs;key;
        $if[$get[animalVarCode]==$env[key];
          $let[animalName;$env[animals;$env[animalsIndexes;$get[animalID]];variants;$get[i];name]]
          $let[animalDesc;$env[animals;$env[animalsIndexes;$get[animalID]];variants;$get[i];description]]
          $let[animalEmoji;$env[animals;$env[animalsIndexes;$get[animalID]];variants;$get[i];emoji]]
          
          $addOption[$get[animalName];$get[animalDesc];$get[animalID]-$get[i];$get[animalEmoji]]
        ]
      ]
    ;i;true]
  `
}

function embed(id) {
  return `
    $let[currentAnimalVariant;$env[userWardrobe;$get[animalID]]]
    $let[currentAnimalEmoji;$env[animals;$env[animalsIndexes;$get[animalID]];variants;$get[currentAnimalVariant];emoji]]
    $let[fullName;$env[animals;$env[animalsIndexes;$get[animalID]];fullName]]

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator
      $addTextDisplay[## All available skins for \`$get[fullName]\`:]
      ${newMenu(id)}
      $addSeparator
      $addTextDisplay[## Equipped skin:\n# $get[currentAnimalEmoji]]
    ;$getGlobalVar[defaultColor]]
  `
}

function json() {
  return `
    $jsonLoad[userWardrobe;$getUserVar[userWardrobe]]
    $jsonLoad[animals;$readFile[json/animals.json]]
    $jsonLoad[animalsIndexes;$getGlobalVar[animalsIndexes]]
    $jsonLoad[shopItems;$getGlobalVar[shopItems]]
    $jsonLoad[userSPs;$env[userProfile;userPacks]]
    $arrayPush[userSPs;s1;s2]
    $arrayLoad[content]
  `
}

function menu(id = "$get[arg]") {
  return `
    $addActionRow
    $addStringSelectMenu[${id}-wardrobe-$authorID;Choose a skinpack:]

    $addOption[Season 1;;Season 1]
    $addOption[Season 2;;Season 2]
    $addOption[Winter Version;;Winter Version]

    $if[$arrayAt[userSPs;0]!=;
    
      $arrayForEach[userSPs;key;
        $loop[$arrayLength[shopItems];
          $let[i;$math[$env[i] - 1]]
          $jsonLoad[item;$arrayAt[shopItems;$get[i]]]

          $let[name;$env[item;name]]
          $let[code;$env[item;code]]

          $if[$get[code]==$env[key];;$continue]

          $addOption[$get[name];;$get[name]]

          $break
        ;i;true]
      ]
    ]
  `
}