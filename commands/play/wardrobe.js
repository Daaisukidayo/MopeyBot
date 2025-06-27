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

      $addActionRow
      $addStringSelectMenu[new-$authorID;Select a skin:]

      ${loop()}
      ${embed()}

    ;$if[$isNumber[$get[arg]];
      $getGlobalVar[author]
      $color[$getGlobalVar[defaultColor]]
      $title[Select a skinpack]
      ${menu()}

    ;$if[$get[arg]==all;

      $getGlobalVar[author]
      $color[$getGlobalVar[defaultColor]]
      $title[Select a skinpack]
      ${menu()}

    ;$onlyIf[$arrayIncludes[animalsNames;$get[arg]];
        $color[$getGlobalVar[errorColor]]
        $getGlobalVar[author]
        $title[:x: Invalid arguments!]
        $description[## Animal not found]
      ]

      $let[animal;$get[arg]]
      $let[desc;]

      $addActionRow
      $addStringSelectMenu[animal-$authorID;Select a skin:]

      ${loop()}
      ${embed()}
      
    ]]]

    $setUserVar[userProfile;$env[userProfile]]
  `
},{
  type: "interactionCreate", 
  allowedInteractionTypes: ["selectMenu"],
  description: "if user's argument is new",
  code: `
    $onlyIf[$includes[$selectMenuValues;+]]
    $textSplit[$selectMenuValues;-]
    $onlyIf[$splitText[1]==$authorID;  $callFunction[notYourBTN;]  ]

    $let[1part;$splitText[0]]
    $textSplit[$customID;-]
    $onlyIf[$splitText[0]==new]
    $textSplit[$get[1part];+]

    $let[variant;$splitText[0]]  
    $let[an;$splitText[1]]
    
    $onlyIf[$and[$get[variant]!=;$get[an]!=]]

    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $jsonLoad[animals;$readFile[json/animals.json]]
    $jsonLoad[animalsNames;$jsonKeys[animals]]
    $jsonLoad[allVariants;$getGlobalVar[allVariants]]
    $jsonLoad[shopItems;$getGlobalVar[shopItems]]
    $onlyIf[$arrayIncludes[animalsNames;$get[an]]]

    $!jsonSet[userProfile;userWardrobe;$get[an];$get[variant]]
    $setUserVar[userProfile;$env[userProfile]]        

    $let[i;$arrayIndexOf[animalsNames;$get[an]]]
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
    $textSplit[$selectMenuValues;-]
    $onlyIf[$splitText[1]==$authorID;  $callFunction[notYourBTN;]  ]

    $textSplit[$splitText[0];+]
    $let[tier;$splitText[0]]
    $let[spcode;$replace[$splitText[1];_;-]]
    $let[skinpack;$replace[$splitText[2];_; ]]
    $onlyIf[$isNumber[$get[tier]]]

    $textSplit[$customID;-]
    $onlyIf[$isNumber[$splitText[0]]]

    $jsonLoad[userProfile;$getUserVar[userProfile]]
    ${json()}

    $let[desc;]

    $arrayForEach[animalsNames;animal;
      $if[$env[animals;$env[animal];tier]==$get[tier];

        $let[i;0]

        $while[$get[i]<25;
          $if[$env[animals;$env[animal];variants;$get[i];vCode]==$get[spcode];
              $!jsonSet[userProfile;userWardrobe;$env[animal];$get[i]]
              $let[desc;$get[desc] $env[animals;$env[animal];variants;$get[i];emoji]]
          ]
          $letSum[i;1]
        ]
      ]
    ]

    $setUserVar[userProfile;$env[userProfile]]

    $getGlobalVar[author]
    $if[$get[desc]!=;
      $color[$getGlobalVar[defaultColor]]
      $description[# $get[desc]]
      $title[You have successfully equipped tier \`$get[tier]\` animals with the «$get[skinpack]»!]
    ;
      $color[Orange]
      $title[Tier \`$get[tier]\` don't have any skins from «$get[skinpack]»]
    ]
    $!editMessage[$channelID;$messageID]
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["selectMenu"],
  description: "if user choses skinpack providing all as an argument",
  code: `
    $textSplit[$selectMenuValues;-]
    $onlyIf[$splitText[1]==$authorID;  $callFunction[notYourBTN;]  ]

    $textSplit[$splitText[0];+]
    $let[key;$splitText[0]]
    $let[spcode;$replace[$splitText[1];_;-]]
    $let[skinpack;$replace[$splitText[2];_; ]]
    $onlyIf[$get[key]==all]

    $textSplit[$customID;-]
    $onlyIf[$splitText[0]==all]

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
    $title[You have successfully equipped \`all\` animals with the «$get[skinpack]»!]
    $getGlobalVar[author]
    $!editMessage[$channelID;$messageID]
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["selectMenu"],
  description: "if user choses skinpack providing animal as an argument",
  code: `
    $onlyIf[$includes[$selectMenuValues;+]]
    $textSplit[$selectMenuValues;-]
    $onlyIf[$splitText[1]==$authorID;  $callFunction[notYourBTN;]  ]

    $let[1part;$splitText[0]]
    $textSplit[$customID;-]
    $onlyIf[$splitText[0]==animal]
    $textSplit[$get[1part];+]

    $let[variant;$splitText[0]]  
    $let[animal;$splitText[1]]
    
    $onlyIf[$and[$get[variant]!=;$get[animal]!=]]

    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $jsonLoad[animals;$readFile[json/animals.json]]
    $jsonLoad[animalsNames;$jsonKeys[animals]]
    $jsonLoad[allVariants;$getGlobalVar[allVariants]]
    $jsonLoad[shopItems;$getGlobalVar[shopItems]]
    $onlyIf[$arrayIncludes[animalsNames;$get[animal]]]

    $!jsonSet[userProfile;userWardrobe;$get[animal];$get[variant]]
    $setUserVar[userProfile;$env[userProfile]]
    $addActionRow
    $addStringSelectMenu[animal-$authorID;Choose a skin:]
    ${loop()}
    ${embed()}
    $!editMessage[$channelID;$messageID]
    $deferUpdate
`}]


// Functions


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
          $let[animalTrig;$get[num]+$env[animals;$get[animal];trig]]
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
    $description[# $get[desc];0]
    $getGlobalVar[author]
    $footer[Select a skin for the animal you want to equip!]
    $title[All available skins for \`$env[animals;$get[animal];fullName]\`:;;0]
    $color[$getGlobalVar[defaultColor];0]
    
    $let[currentAnimalVariant;$env[userProfile;userWardrobe;$get[animal]]]
    $let[currentAnimalEmoji;$env[animals;$get[animal];variants;$get[currentAnimalVariant];emoji]]
    
    $color[$getGlobalVar[defaultColor];1]
    $title[Current equipped skin:;;1]
    $description[# $get[currentAnimalEmoji];1]
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

function menu () {
  return `
    $addActionRow
    $addStringSelectMenu[$get[arg]-$authorID;Choose a skinpack:]

    $addOption[Seasonal 1 Skinpack;;$get[arg]+s1+Seasonal_1_Skinpack-$authorID]
    $addOption[Seasonal 2 Skinpack;;$get[arg]+s2+Seasonal_2_Skinpack-$authorID]
    $addOption[Winter Skinpack;;$get[arg]+s2_w+Winter_Skinpack-$authorID]

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
