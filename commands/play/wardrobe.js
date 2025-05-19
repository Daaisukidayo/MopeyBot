module.exports = [{
  name: "wardrobe", 
  aliases: ["wr"], 
  type: "messageCreate", 
  code: `
    $reply
    $let[cdTime;10s]

    $callFunction[checking;]
    $callFunction[cooldown;$get[cdTime]]

    $let[arg;$toLowerCase[$message]]

    $onlyIf[$get[arg]!=;
      $callFunction[errorMSG]
      $title[:x: Missing arguments!]
      $description[## Usage 1: \`$getGuildVar[prefix]wardrobe new\`\n## Usage 2: \`$getGuildVar[prefix]wardrobe {tier|all} [SKINPACK_ID\\]\`]
    ]

    $let[arg1;$toLowerCase[$message[0]]]
    $let[arg2;$toLowerCase[$message[1]]]

    $jsonLoad[animals;$readFile[json/animals.json]]
    $jsonLoad[userPacks;$getUserVar[userPacks]]
    $jsonLoad[userWardrobe;$getUserVar[userWardrobe]]
    $arrayLoad[animalsNames;, ;$advancedReplace[$trimLines[$jsonKeys[animals]];\\[\n;;\n\\];;\n; ;";]]
    $arrayLoad[skinpackNames;, ;$advancedReplace[$trimLines[$getGlobalVar[allVariants]];\\[\n;;\n\\];;\n; ;";]]


    $if[$get[arg]==new;
        $let[animal;mouse]
        $let[desc;]

        $addActionRow
        $addStringSelectMenu[skins-$authorID;Choose a skin:]

        ${loop()}

        ${embed()}

    ;$if[$isNumber[$get[arg1]];

        $onlyIf[$get[arg2]!=;
          $callFunction[errorMSG]
          $title[:x: Missing arguments!]
          $description[## You must specify an skinpack id!]
        ]
        $onlyIf[$arrayIncludes[skinpackNames;$get[arg2]];
          $callFunction[errorMSG]
          $title[:x: Invalid arguments!]
          $description[## This skinpack does not exist!]
        ]
        
        $let[desc;]
        
        ${skinpacks()}
        
        $arrayForEach[animalsNames;animal;
            $if[$env[animals;$env[animal];tier]==$get[arg1];
                
                $let[i;0]
                
                $while[$get[i]<25;
                    $if[$env[animals;$env[animal];v$get[i];vCode]==$get[arg2];
                        $!jsonSet[userWardrobe;$env[animal];v$get[i]]
                        $let[desc;$get[desc] $env[animals;$env[animal];v$get[i];emoji]]
                    ]
                    $letSum[i;1]
                ]
            ]
        ]

        $onlyIf[$get[desc]!=;$sendMessage[$channelid;# All Tier «\`$get[arg1]\`» animals don't have the «\`$get[skinpack]\`» Skinpack!]]

        $setUserVar[userWardrobe;$env[userWardrobe]]

        $sendMessage[$channelID;
            $getGlobalVar[author]
            $description[# $get[desc]]
            $color[$getGlobalVar[defaultColor]]
            $title[You have successfully equipped tier «$get[arg1]» animals with the «$get[skinpack]» Skinpack!]
        ]
            
    ;$if[$get[arg1]==all;
            
        $onlyIf[$get[arg2]!=;## You must specify a skinpack!]
        $onlyIf[$arrayIncludes[skinpackNames;$get[arg2]];## This skinpack does not exist!]
        
        ${skinpacks()}
        
        $arrayForEach[animalsNames;animal;
        
            $let[i;0]
            
            $while[$get[i]<25;
                $if[$env[animals;$env[animal];v$get[i];vCode]==$get[arg2];
                    $!jsonSet[userWardrobe;$env[animal];v$get[i]]
                    $break
                ]
                $letSum[i;1]
            ]
        ]
        
        $setUserVar[userWardrobe;$env[userWardrobe]]
        
        $sendMessage[$channelID;
            $getGlobalVar[author]
            $description[# You have successfully equipped all animals with the «\`$get[skinpack]\`» Skinpack!]
            $color[$getGlobalVar[defaultColor]]
        ]
    ]]]
  `
},{
  type: "interactionCreate", 
  allowedInteractionTypes: ["selectMenu"], 
  code: `
    $onlyIf[$includes[$selectMenuValues;+]]

    $textSplit[$selectMenuValues;-]

    $onlyIf[$splitText[1]==$authorID;  $callFunction[notYourBTN;]  ]

    $let[1part;$splitText[0]]
    $textSplit[$get[1part];+]

    
    $onlyIf[$and[$splitText[0]!=;$splitText[1]!=]]                  $c[Only if id has 2 parts] 

    $let[variant;$splitText[0]]  
    $let[an;$splitText[1]]

    $jsonLoad[animals;$readFile[json/animals.json]]

    $arrayLoad[animalsNames;, ;$advancedReplace[$trimLines[$jsonKeys[animals]];\\[\n;;\n\\];;\n; ;";]] $c["]
    $onlyIf[$arrayIncludes[animalsNames;$get[an]]]

    $jsonLoad[userPacks;$getUserVar[userPacks]]
    $jsonLoad[userWardrobe;$getUserVar[userWardrobe]]

    $!jsonSet[userWardrobe;$get[an];$get[variant]]                  $c[setting new chosen skin] 
    $setUserVar[userWardrobe;$jsonStringify[userWardrobe;2]]        $c[making json object as string with new saved skins and replacing old data with new] 


    $let[i;$arrayIndexOf[animalsNames;$get[an]]]                    $c[finding animal code name inside array index]
    
    $let[animal;$arrayAt[animalsNames;$math[$get[i] + 1]]]

    $onlyIf[$get[animal]!=;$!editMessage[$channelID;$messageID;# You equipped all skins!]]

    $addActionRow
    $addStringSelectMenu[skins-$authorID;Choose a skin:]
    ${loop()}

    $!editMessage[$channelID;$messageID;${embed()}]
    $deferUpdate
  `
}]


// Functions


function loop() {
return `
$loop[25;

  $let[num;$math[$env[i] - 1]] 

  $if[$env[animals;$get[animal];v$get[num]]!=;;
    $break
  ]


  $let[animalVarCode;$env[animals;$get[animal];v$get[num];vCode]] 


  $if[$or[$and[$env[userPacks;goldenSP]==false;$get[animalVarCode]==gsp];$and[$env[userPacks;lockedSP]==false;$get[animalVarCode]==lsp];$and[$env[userPacks;halloweenSP]==false;$get[animalVarCode]==hsp2020]]==false;;
    $continue
  ]


  $let[animalName;$env[animals;$get[animal];v$get[num];name]] 
  $let[animalTrig;v$get[num]+$env[animals;$get[animal];trig]] 
  $let[animalDesc;$env[animals;$get[animal];v$get[num];description]] 
  $let[animalEmoji;$env[animals;$get[animal];v$get[num];emoji]] 
  $let[desc;$get[desc] $get[animalEmoji]] 

  $addOption[$get[animalName];$get[animalDesc];$get[animalTrig]-$authorID;$get[animalEmoji]] 

;i;desc]`
}

function embed() {
return `
$description[# $get[desc];0]
$getGlobalVar[author]
$footer[Choose a skin for the animal you want to equip!]
$title[All available skins for \`$env[animals;$get[animal];fullName]\`:;;0]

$let[currentAnimalVariant;$env[userWardrobe;$get[animal]]]
$let[currentAnimalEmoji;$env[animals;$get[animal];$get[currentAnimalVariant];emoji]]

$title[Current equipped skin:;;1]
$description[# $get[currentAnimalEmoji];1]`
}

function skinpacks() {
return `
$switch[$get[arg2];
  $case[$arrayAt[skinpackNames;0];$let[skinpack;Seasonal 1]]
  $case[$arrayAt[skinpackNames;1];$let[skinpack;Seasonal 2]]
  $case[$arrayAt[skinpackNames;2];$let[skinpack;Seasonal 2 Winter]]
  $case[$arrayAt[skinpackNames;3];$let[skinpack;Legacy]]
  $case[$arrayAt[skinpackNames;4];$let[skinpack;Legacy Winter]]
  $case[$arrayAt[skinpackNames;5];$let[skinpack;Storefront]]
  $case[$arrayAt[skinpackNames;6];$let[skinpack;Summer 2021]]
  $case[$arrayAt[skinpackNames;7];$let[skinpack;Summer 2022]]
  $case[$arrayAt[skinpackNames;8];$let[skinpack;May 2022]]
  $case[$arrayAt[skinpackNames;9];$let[skinpack;Christmas 2022]]
  $case[$arrayAt[skinpackNames;10];$let[skinpack;Valentine 2023]]
  $case[$arrayAt[skinpackNames;11];$let[skinpack;Golden]]
  $case[$arrayAt[skinpackNames;12];$let[skinpack;Locked]]
  $case[$arrayAt[skinpackNames;13];$let[skinpack;Halloween 2020]]
  $case[$arrayAt[skinpackNames;14];$let[skinpack;Halloween 2021]]
  $case[$arrayAt[skinpackNames;15];$let[skinpack;Halloween 2022]]
  $case[$arrayAt[skinpackNames;16];$let[skinpack;Halloween 2023]]
  $case[$arrayAt[skinpackNames;17];$let[skinpack;Land Gold-Trim]]
  $case[$arrayAt[skinpackNames;18];$let[skinpack;Desert Gold-Trim]]
  $case[$arrayAt[skinpackNames;19];$let[skinpack;Ocean Gold-Trim]]
  $case[$arrayAt[skinpackNames;20];$let[skinpack;Arctic Gold-Trim]]
  $case[$arrayAt[skinpackNames;21];$let[skinpack;Promo]]
]
`}