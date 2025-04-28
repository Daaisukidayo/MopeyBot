module.exports = [{
name: "kingdragon",
aliases: ["kd"],
type: "messageCreate",
code: `

$reply

$let[cdTime;2m]
$callFunction[checking;]
$callFunction[cooldown;$get[cdTime]]

$jsonLoad[animals;$readFile[json/animals.json]]
$jsonLoad[userPacks;$getUserVar[userPacks]]

$let[BDS1;$env[animals;blackDragon;v0;emoji]]
$let[BDS2;$env[animals;blackDragon;v1;emoji]]

$let[KDS1;$env[animals;kingDragon;v0;emoji]]
$let[KDS2;$env[animals;kingDragon;v1;emoji]]

$let[leg;$env[userPacks;legacySP]]
$let[gsp;$env[userPacks;goldenSP]]
$let[lsp;$env[userPacks;lockedSP]]
$let[sfsp;$env[userPacks;storefrontSP]]


$getGlobalVar[author]
$color[$getGlobalVar[defaultColor]]


$let[KDLuckDesc;## Choose an upgrade:\n# $env[animals;kingDragon;v0;emoji] $env[animals;kingDragon;v1;emoji]$if[$env[userPacks;lockedSP]; $env[animals;kingDragon;v2;emoji] $env[animals;kingDragon;v3;emoji] $env[animals;kingDragon;v4;emoji] $env[animals;kingDragon;v5;emoji] $env[animals;kingDragon;v6;emoji]]$if[$env[userPacks;storefrontSP]; $env[animals;kingDragon;v7;emoji]]$if[$env[userPacks;goldenSP]; $env[animals;kingDragon;v8;emoji]]]

$let[normalBDDesc;## Choose an upgrade:\n# $get[BDS1] $get[BDS2]$if[$get[leg]; $env[animals;kingDragon;v4;emoji]]$if[$get[gsp]; $env[animals;kingDragon;v3;emoji]]$if[$get[lsp]; $env[animals;kingDragon;v2;emoji]]]



$let[r;1000]

$if[$getUserVar[dev];
  $let[r;5]
]

$addActionRow

$if[$randomNumber[1;$sum[1;$get[r]]]==1;
  $callFunction[kdMenu;luck2]
  $description[$get[KDLuckDesc]]
  $color[d61b4a]
;
  ${bdMenu()} 
  $description[$get[normalBDDesc]]
]
`
},{
type: "interactionCreate",
allowedInteractionTypes: ["selectMenu"],
code: `
$textSplit[$selectMenuValues;-]
$onlyIf[$splitText[1]==$authorID;  $callFunction[notYourBTN;]  ]
$onlyIf[$or[$splitText[0]==legbd;$splitText[0]==bds1;$splitText[0]==bds2;$splitText[0]==gbd;$splitText[0]==ab]]

$jsonLoad[animals;$readFile[json/animals.json]]
$jsonLoad[userPacks;$getUserVar[userPacks]]

$arrayLoad[KDS;,\n  ;
  $env[animals;kingDragon;v0;name] $env[animals;kingDragon;v0;emoji],
  $env[animals;kingDragon;v1;name] $env[animals;kingDragon;v1;emoji],
  $env[animals;kingDragon;v2;name] $env[animals;kingDragon;v2;emoji],
  $env[animals;kingDragon;v3;name] $env[animals;kingDragon;v3;emoji],
  $env[animals;kingDragon;v4;name] $env[animals;kingDragon;v4;emoji],
  $env[animals;kingDragon;v5;name] $env[animals;kingDragon;v5;emoji],
  $env[animals;kingDragon;v6;name] $env[animals;kingDragon;v6;emoji],
  $env[animals;kingDragon;v7;name] $env[animals;kingDragon;v7;emoji],
  $env[animals;kingDragon;v8;name] $env[animals;kingDragon;v8;emoji]]

$arrayLoad[content1;,\n  ;but you got killed by teamers,
  but you got disconnected with $randomNumber[1;12] apexes away,
  but Mistik made an event so you lost your BD,
  but rares bullied and killed you,
  but you died from another BD,
  But you died by low lava,
  but there was a $arrayRandomValue[KDS] in the server so you were killed by him]

$getGlobalVar[author]

$if[$randomNumber[1;101]>=40;

  $description[## Choose an upgrade:\n# $env[animals;kingDragon;v0;emoji] $env[animals;kingDragon;v1;emoji]$if[$env[userPacks;lockedSP]; $env[animals;kingDragon;v2;emoji] $env[animals;kingDragon;v3;emoji] $env[animals;kingDragon;v4;emoji] $env[animals;kingDragon;v5;emoji] $env[animals;kingDragon;v6;emoji]]$if[$env[userPacks;storefrontSP]; $env[animals;kingDragon;v7;emoji]]$if[$env[userPacks;goldenSP]; $env[animals;kingDragon;v8;emoji]]]
  $color[$getGlobalVar[defaultColor]]
  $callFunction[kdMenu;normal]

; 
    
  $if[$splitText[0]==bds1;
    $let[BD;$env[animals;blackDragon;v0;name] $env[animals;blackDragon;v0;emoji]]
  ;$if[$splitText[0]==bds2;
    $let[BD;$env[animals;blackDragon;v1;name] $env[animals;blackDragon;v1;emoji]]
  ;$if[$splitText[0]==ab;
    $let[BD;$env[animals;blackDragon;v2;name] $env[animals;blackDragon;v2;emoji]]
  ;$if[$splitText[0]==gbd;
    $let[BD;$env[animals;blackDragon;v3;name] $env[animals;blackDragon;v3;emoji]]
  ;$if[$splitText[0]==legbd;
    $let[BD;$env[animals;blackDragon;v4;name] $env[animals;blackDragon;v4;emoji]]
  ]]]]]

  $let[MC;$randomNumber[1000;1501]]
  $callFunction[sumMC;$get[MC]]
  $description[## You tried to get King Dragon as __$get[BD]__ $arrayRandomValue[content1]... Atleast you got $separateNumber[$get[MC];.]$getGlobalVar[emoji] from this run!]
  $color[$getGlobalVar[errorColor]]
]
$!editMessage[$channelID;$messageID]

$deferUpdate

`
}]

function bdMenu() {
return `  

$addStringSelectMenu[bdmenu-$authorID;Choose an upgrade:]

$addOption[$env[animals;blackDragon;v0;name];;bds1-$authorID;$get[BDS1]]
$addOption[$env[animals;blackDragon;v1;name];;bds2-$authorID;$get[BDS2]]

$if[$get[leg];
  $addOption[$env[animals;blackDragon;v4;name];;legbd-$authorID;$env[animals;blackDragon;v4;emoji]]
]

$if[$get[gsp];
  $addOption[$env[animals;blackDragon;v3;name];;gbd-$authorID;$env[animals;blackDragon;v3;emoji]]
]

$if[$get[lsp];
  $addOption[$env[animals;blackDragon;v2;name];;ab-$authorID;$env[animals;blackDragon;v2;emoji]]
]`
}
