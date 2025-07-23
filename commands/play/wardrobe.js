module.exports = [{
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

    $c[Only if argument is provided]

    $onlyIf[$get[arg]!=;
      $color[$getGlobalVar[errorColor]]
      $getGlobalVar[author]
      $title[:x: Missing arguments!]
      $description[## Usage: \`$getGuildVar[prefix]wardrobe {new|all|<tier>|<animal>}\`]
    ]

    ${json()}

    $if[$get[arg]==new;
      $let[animal;mouse]
      $let[desc;]

      ${newMenu("new")}
      ${loop()}
      ${embed()}

    ;
      $if[$get[arg]==all;
        $getGlobalVar[author]
        $color[$getGlobalVar[defaultColor]]
        $description[# Choose a skinpack]
        ${menu("all")}
      ;
        $if[$isNumber[$get[arg]];
          $getGlobalVar[author]
          $color[$getGlobalVar[defaultColor]]
          $description[# Choose a skinpack]
          ${menu("num")}
        ;
          $onlyIf[$arrayIncludes[animalsNames;$get[arg]];
            $color[$getGlobalVar[errorColor]]
            $getGlobalVar[author]
            $title[:x: Invalid arguments!]
            $description[## Animal not found]
          ]

          $let[animal;$get[arg]]
          $let[desc;]

          ${newMenu()}
          ${loop()}
          ${embed()}
        ]
      ]
    ]
  `
},{
  type: "interactionCreate", 
  allowedInteractionTypes: ["selectMenu"],
  description: "if user's argument is new",
  code: `
    $arrayLoad[val;-;$selectMenuValues]
    $arrayLoad[cid;-;$customID]
    $onlyIf[$env[cid;0]==new]
    $onlyIf[$arrayIncludes[val;$authorID];$callFunction[notYourBTN]]

    $let[variant;$env[val;0]]  
    $let[animal;$env[val;1]]
    
    $onlyIf[$and[$get[variant]!=;$get[animal]!=]]

    $jsonLoad[userProfile;$getUserVar[userProfile]]
    ${json()}
    $onlyIf[$arrayIncludes[animalsNames;$get[animal]]]

    $!jsonSet[userProfile;userWardrobe;$get[animal];$get[variant]]
    $setUserVar[userProfile;$env[userProfile]]        

    $let[i;$arrayIndexOf[animalsNames;$get[animal]]]
    $let[animal;$arrayAt[animalsNames;$math[$get[i] + 1]]]

    $onlyIf[$get[animal]!=;$!editMessage[$channelID;$messageID;# You equipped all skins!]]

    $addActionRow
    $addStringSelectMenu[new-$authorID;Choose a skin:]
    ${loop()}
    ${embed()}
    $!editMessage[$channelID;$messageID]
    $deferUpdate
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["selectMenu"],
  description: "if user choses skinpack providing number as an argument",
  code: `
    $arrayLoad[val;-;$selectMenuValues]
    $arrayLoad[cid;-;$customID]
    $onlyIf[$env[cid;0]==num]
    $onlyIf[$arrayIncludes[val;$authorID];$callFunction[notYourBTN]]

    $let[tier;$env[val;0]]
    $let[spcode;$replace[$env[val;1];_;-]]
    $let[skinpack;$replace[$env[val;2];_; ]]
    $let[desc;]

    $jsonLoad[userProfile;$getUserVar[userProfile]]
    ${json()}

    $loop[$arrayLength[animalsNames];
      $let[i;$math[$env[i] - 1]]
      $let[animal;$arrayAt[animalsNames;$get[i]]]
      $let[animalTier;$env[animals;$get[animal];tier]]

      $if[$get[animalTier]>$get[tier];$break]
      $if[$get[animalTier]!=$get[tier];$continue]

      $jsonLoad[allVariants;$env[animals;$get[animal];variants]]

      $loop[$arrayLength[allVariants];
        $let[j;$math[$env[j] - 1]]
        $jsonLoad[v;$arrayAt[allVariants;$get[j]]]

        $if[$env[v;vCode]==$get[spcode];;$continue]

        $!jsonSet[userProfile;userWardrobe;$get[animal];$get[j]]
        $let[desc;$get[desc] $env[v;emoji]]
        $break

      ;j;desc]
    ;i;desc]

    $setUserVar[userProfile;$env[userProfile]]

    $getGlobalVar[author]
    $if[$get[desc]!=;
      $color[$getGlobalVar[defaultColor]]
      $description[# $get[desc]]
      $title[You have successfully equipped every tier \`$get[tier]\` animal with the «$get[skinpack]»!]
    ;
      $color[Orange]
      $title[Every tier \`$get[tier]\` animal don't have any skins in the «$get[skinpack]»]
    ]
    $!editMessage[$channelID;$messageID]
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["selectMenu"],
  description: "if user choses skinpack providing all as an argument",
  code: `
    $arrayLoad[val;-;$selectMenuValues]
    $onlyIf[$env[val;0]==all]
    $onlyIf[$arrayIncludes[val;$authorID];$callFunction[notYourBTN]]

    $let[spcode;$replace[$env[val;1];_;-]]
    $let[skinpack;$replace[$env[val;2];_; ]]

    $jsonLoad[userProfile;$getUserVar[userProfile]]
    ${json()}

    $arrayForEach[animalsNames;animal;
      $let[i;0]
      $while[$get[i]<25;
        $if[$env[animals;$env[animal];variants;$get[i];vCode]==$get[spcode];
          $!jsonSet[userProfile;userWardrobe;$env[animal];$get[i]]
          $break
        ]
        $letSum[i;1]
      ]
    ]
    $setUserVar[userProfile;$env[userProfile]]

    $color[$getGlobalVar[defaultColor]]
    $title[You have successfully equipped every animal with the «$get[skinpack]»!]
    $getGlobalVar[author]
    $!editMessage[$channelID;$messageID]
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["selectMenu"],
  description: "if user choses skinpack providing animal as an argument",
  code: `
    $arrayLoad[val;-;$selectMenuValues]
    $arrayLoad[cid;-;$customID]
    $onlyIf[$env[cid;0]==animal]
    $onlyIf[$arrayIncludes[val;$authorID];$callFunction[notYourBTN]]

    $let[variant;$env[val;0]]  
    $let[animal;$env[val;1]]
    $let[msg;$messageID]
    
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    ${json()}
    $onlyIf[$arrayIncludes[animalsNames;$get[animal]]]

    $!jsonSet[userProfile;userWardrobe;$get[animal];$get[variant]]
    $setUserVar[userProfile;$env[userProfile]]

    ${newMenu()}
    ${loop()}
    ${embed()}
    $!editMessage[$channelID;$get[msg]]
    $deferUpdate
    $!clearTimeout[WARDROBE-$authorID]
    ${timeout()}
  `
}]


// Functions

function timeout() {
  return `
    $setTimeout[
      $!disableComponentsOf[$channelID;$get[msg]]
    ;1m;WARDROBE-$authorID]
  `
}

function newMenu(id = "animal") {
  return `
    $addActionRow
    $addStringSelectMenu[${id}-$authorID;Choose a skin:]
  `
}


function loop() {
  return `
    $loop[25;

      $let[num;$math[$env[i] - 1]] 

      $if[$env[animals;$get[animal];variants;$get[num]]!=;;
        $break
      ]

      $let[animalVarCode;$env[animals;$get[animal];variants;$get[num];vCode]] 

      $arrayForEach[allVariants;variant;
        $let[hasPack;$or[$env[variant;req]==null;$env[userProfile;userPacks;$env[variant;req]]!=]]

        $if[$and[$env[variant;v]==$get[animalVarCode];$get[hasPack]];
          $let[animalName;$env[animals;$get[animal];variants;$get[num];name]]
          $let[animalTrig;$get[num]-$env[animals;$get[animal];trig]]
          $let[animalDesc;$env[animals;$get[animal];variants;$get[num];description]]
          $let[animalEmoji;$env[animals;$get[animal];variants;$get[num];emoji]]
          $let[desc;$get[desc] $get[animalEmoji]]

          $addOption[$get[animalName];$get[animalDesc];$get[animalTrig]-$authorID;$get[animalEmoji]]
        ]
      ]
    ;i;desc]
  `
}

function embed() {
  return `
    $let[currentAnimalVariant;$env[userProfile;userWardrobe;$get[animal]]]
    $let[currentAnimalEmoji;$env[animals;$get[animal];variants;$get[currentAnimalVariant];emoji]]

    $description[## All available skins for \`$env[animals;$get[animal];fullName]\`:\n# $get[desc]\n## Equipped skin:\n# $get[currentAnimalEmoji]]
    $getGlobalVar[author]
    $color[$getGlobalVar[defaultColor]]
  `
}

function json() {
  return `
    $jsonLoad[animals;$readFile[json/animals.json]]
    $jsonLoad[animalsNames;$jsonKeys[animals]]
    $jsonLoad[allVariants;$getGlobalVar[allVariants]]
    $jsonLoad[shopItems;$getGlobalVar[shopItems]]
    $jsonLoad[userSPs;$env[userProfile;userPacks]]
    $jsonLoad[userSPsKeys;$jsonKeys[userSPs]]
  `
}

function menu (id = "$get[arg]") {
  return `
    $addActionRow
    $addStringSelectMenu[${id}-$authorID;Choose a skinpack:]

    $addOption[Seasonal 1 Skinpack;;$get[arg]-s1-Seasonal_1_Skinpack-$authorID]
    $addOption[Seasonal 2 Skinpack;;$get[arg]-s2-Seasonal_2_Skinpack-$authorID]
    $addOption[Winter Skinpack;;$get[arg]-s2_w-Winter_Skinpack-$authorID]

    $if[$arrayAt[userSPsKeys;0]!=;
    
      $arrayForEach[userSPsKeys;key;
        $arrayForEach[shopItems;item;
          $if[$env[item;name]==$env[key];
            $let[desc;$env[item;description]]
            $let[spcode;$env[item;code]]
          ]
        ]
        $addOption[$get[desc];;$get[arg]+$get[spcode]+$replace[$get[desc]; ;_]-$authorID]
      ]
    ]
  `
}

/*
$arrayForEach[animalsNames;animal;
        $let[i;0]
        $while[$get[i]<25;
          $if[$env[animals;$env[animal];variants;$get[i];vCode]==$get[spcode];
            $!jsonSet[userProfile;userWardrobe;$env[animal];$get[spcode]]
            $break
          ]
          $letSum[i;1]
        ]
      ]

      $getGlobalVar[author]
      $description[# You have successfully equipped __all__ animals with the «\`$get[skinpack]\`» Skinpack!]
      $color[$getGlobalVar[defaultColor]]

    ;$if[$arrayIncludes[animalsNames;$get[arg]];

      $let[i;0]
      $while[$get[i]<25;
        $if[$env[animals;$get[animal];variants;$get[i];vCode]==$get[1];
          $!jsonSet[userProfile;userWardrobe;$get[animal];$get[i]]
          $break
        ]
        $letSum[i;1]
      ]

      $getGlobalVar[author]
      $description[# You have successfully equipped «\`$env[animals;$get[animal];fullName]\`» with the «\`$get[skinpack]\`» Skinpack!]
      $color[$getGlobalVar[defaultColor]]

*/
