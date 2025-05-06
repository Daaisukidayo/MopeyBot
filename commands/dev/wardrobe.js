module.exports = [{
name: "wardrobe", 
aliases: ["wr"], 
type: "messageCreate", 
code: `

$reply
$let[cdTime;10s]

$callFunction[checking;]
$callFunction[cooldown;$get[cdTime]]


$jsonLoad[animals;$readFile[json/animals.json]]
$jsonLoad[userPacks;$getUserVar[userPacks]]
$jsonLoad[userWardrobe;$getUserVar[userWardrobe]]

$let[animal;mouse]
$let[desc;]

$addActionRow
$addStringSelectMenu[skins-$authorID;Choose a skin:]

${loop()}

${embed()}
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

 
$onlyIf[$all[$splitText[0]!=;$splitText[1]!=]           $c[Only if id has 2 parts] 

$let[variant;$splitText[0]]  
$let[an;$splitText[1]]

$jsonLoad[animals;$readFile[json/animals.json]]

$arrayLoad[animalsNames;, ;$advancedReplace[$trimLines[$jsonKeys[animals]];\\[\n;;\n\\];;\n; ;";]]
$onlyIf[$arrayIncludes[animalsNames;$get[an]]]

$jsonLoad[userPacks;$getUserVar[userPacks]]
$jsonLoad[userWardrobe;$getUserVar[userWardrobe]]

$!jsonSet[userWardrobe;$get[an];$get[variant]]                   $c[setting new chosen skin] 
$setUserVar[userWardrobe;$jsonStringify[userWardrobe;2]]        $c[making json object as string with new saved skins and replacing old data into new] 


$let[i;$arrayIndexOf[animalsNames;$get[an]]] $c[--> finding animal code name by array index]
 
$let[animal;$arrayAt[animalsNames;$math[$get[i] + 1]]]

$onlyIf[$get[animal]!=;$!editMessage[$channelID;$messageID;You equipped all skins!]]

$addActionRow
$addStringSelectMenu[skins-$authorID;Choose a skin:]
${loop()}

$!editMessage[$channelID;$messageID;${embed()}]
$deferUpdate
`
}]


function loop() {
return `
$loop[20;

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