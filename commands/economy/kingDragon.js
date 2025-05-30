module.exports = [{
  name: "kingdragon",
  aliases: ["kd"],
  type: "messageCreate",
  code: `
    $reply

    $let[cdTime;2m]
    $callFunction[checking;]
    $callFunction[cooldown;$get[cdTime]]

    ${jsons()}

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

    $let[normalBDDesc;## Choose an upgrade:\n# $get[BDS1] $get[BDS2]$if[$get[leg]; $env[animals;blackDragon;v4;emoji]]$if[$get[gsp]; $env[animals;blackDragon;v3;emoji]]$if[$get[lsp]; $env[animals;blackDragon;v2;emoji]]]

    $let[r;1000]

    $if[$getUserVar[dev];
      $let[r;5]
    ]

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
  description: "showing king dragon  upgrade menu",
  code: `
    $textSplit[$selectMenuValues;-]
    $onlyIf[$splitText[1]==$authorID;  $callFunction[notYourBTN;]  ]
    $onlyIf[$or[$splitText[0]==legbd;$splitText[0]==bds1;$splitText[0]==bds2;$splitText[0]==gbd;$splitText[0]==ab]]

    ${jsons()}

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
        
      $switch[$splitText[0];
        $case[bds1;$let[BD;$env[animals;blackDragon;v0;name] $env[animals;blackDragon;v0;emoji]]]
        $case[bds2;$let[BD;$env[animals;blackDragon;v1;name] $env[animals;blackDragon;v1;emoji]]]
        $case[ab;$let[BD;$env[animals;blackDragon;v2;name] $env[animals;blackDragon;v2;emoji]]]
        $case[gbd;$let[BD;$env[animals;blackDragon;v3;name] $env[animals;blackDragon;v3;emoji]]]
        $case[legbd;$let[BD;$env[animals;blackDragon;v4;name] $env[animals;blackDragon;v4;emoji]]]
      ]

      $let[MC;$randomNumber[1000;1501]]
      $callFunction[sumMC;$get[MC]]
      $description[## You tried to get King Dragon as __$get[BD]__ $arrayRandomValue[content1]... Atleast you got $separateNumber[$get[MC];.]$getGlobalVar[emoji] from this run!]
      $color[$getGlobalVar[errorColor]]
    ]
    $!editMessage[$channelID;$messageID]

    $deferUpdate
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["selectMenu"],
  description: "showing kingdragon final message",
  code: `
    $textSplit[$selectMenuValues;-]
    $onlyIf[$splitText[1]==$authorID;  $callFunction[notYourBTN;]  ]
    $let[cond;normal]
    $onlyIf[$or[$splitText[0]==$get[cond]kds1;$splitText[0]==$get[cond]kds2;$splitText[0]==$get[cond]gkd;$splitText[0]==$get[cond]kr;$splitText[0]==$get[cond]kst;$splitText[0]==$get[cond]ksh;$splitText[0]==$get[cond]qc;$splitText[0]==$get[cond]qs;$splitText[0]==$get[cond]qf]]

    ${jsons()}
    ${kdAssets()}

    $switch[$splitText[0];
      $case[$get[cond]kds1;$let[kd;0]]
      $case[$get[cond]kds2;$let[kd;1]]
      $case[$get[cond]ksh;$let[kd;2]]
      $case[$get[cond]kst;$let[kd;3]]
      $case[$get[cond]kr;$let[kd;4]]
      $case[$get[cond]qc;$let[kd;5]]
      $case[$get[cond]qs;$let[kd;6]]
      $case[$get[cond]gkd;$let[kd;7]]
      $case[$get[cond]qf;$let[kd;8]]
    ]

    $let[MC;$randomNumber[3500;5001]]
    $callFunction[sumMC;$get[MC]]

    $description[## You upgraded to __$env[assets;KD$get[kd];name] $env[assets;KD$get[kd];emoji]__ and you earned $separateNumber[$get[MC];.]$getGlobalVar[emoji]!]
    $getGlobalVar[author]
    $color[$env[assets;KD$get[kd];color]]
    $thumbnail[$env[assets;KD$get[kd];img]]
    $!editMessage[$channelID;$messageID]
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["selectMenu"],
  description: "showing kingdragon by luck final message",
  code: `
    $textSplit[$selectMenuValues;-]
    $onlyIf[$splitText[1]==$authorID;  $callFunction[notYourBTN;]  ]
    $let[cond;luck2]
    $onlyIf[$or[$splitText[0]==$get[cond]kds1;$splitText[0]==$get[cond]kds2;$splitText[0]==$get[cond]gkd;$splitText[0]==$get[cond]kr;$splitText[0]==$get[cond]kst;$splitText[0]==$get[cond]ksh;$splitText[0]==$get[cond]qc;$splitText[0]==$get[cond]qs;$splitText[0]==$get[cond]qf]]

    ${jsons()}
    ${kdAssets()}

    $switch[$splitText[0];
      $case[$get[cond]kds1;$let[kd;0]]
      $case[$get[cond]kds2;$let[kd;1]]
      $case[$get[cond]ksh;$let[kd;2]]
      $case[$get[cond]kst;$let[kd;3]]
      $case[$get[cond]kr;$let[kd;4]]
      $case[$get[cond]qc;$let[kd;5]]
      $case[$get[cond]qs;$let[kd;6]]
      $case[$get[cond]gkd;$let[kd;7]]
      $case[$get[cond]qf;$let[kd;8]]
    ]

    $let[MC;250000]
    $callFunction[sumMC;$get[MC]]

    $color[d61b4a]
    $getGlobalVar[author]

    $thumbnail[$env[assets;KD$get[kd];img]]
    $footer[Rarity: 1/1000]
    $description[## You were trying to upgrade to Black Dragon, but suddenly you saw a different animal, it was __$env[assets;KD$get[kd];name] $env[assets;KD$get[kd];emoji]__ by luck in your upgrade menu! You were surprised and happy! You also earned $separateNumber[$get[MC];.]$getGlobalVar[emoji] from playing!]

    $!editMessage[$channelID;$messageID]
  `
}]


function bdMenu() {
return `  
$addActionRow
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

function jsons() {
return `
$jsonLoad[animals;$readFile[json/animals.json]]
$jsonLoad[userPacks;$getUserVar[userPacks]]`
}

function kdAssets() {
return `
$jsonLoad[assets;{
    "KD0": {
      "name": "$env[animals;kingDragon;v0;name]",
      "emoji": "$env[animals;kingDragon;v0;emoji]",
      "img": "$env[animals;kingDragon;v0;img]",
      "color": "24272b"
    },
    "KD1": {
      "name": "$env[animals;kingDragon;v1;name]",
      "emoji": "$env[animals;kingDragon;v1;emoji]",
      "img": "$env[animals;kingDragon;v1;img]",
      "color": "24272b"
    },
    "KD2": {
      "name": "$env[animals;kingDragon;v2;name]",
      "emoji": "$env[animals;kingDragon;v2;emoji]",
      "img": "$env[animals;kingDragon;v2;img]",
      "color": "731C1F"
    },
    "KD3": {
      "name": "$env[animals;kingDragon;v3;name]",
      "emoji": "$env[animals;kingDragon;v3;emoji]",
      "img": "$env[animals;kingDragon;v3;img]",
      "color": "9D3F0E"
    },
    "KD4": {
      "name": "$env[animals;kingDragon;v4;name]",
      "emoji": "$env[animals;kingDragon;v4;emoji]",
      "img": "$env[animals;kingDragon;v4;img]",
      "color": "6E141A"
    },
    "KD5": {
      "name": "$env[animals;kingDragon;v5;name]",
      "emoji": "$env[animals;kingDragon;v5;emoji]",
      "img": "$env[animals;kingDragon;v5;img]",
      "color": "5EB2FF"
    },
    "KD6": {
      "name": "$env[animals;kingDragon;v6;name]",
      "emoji": "$env[animals;kingDragon;v6;emoji]",
      "img": "$env[animals;kingDragon;v6;img]",
      "color": "B62323"
    },
    "KD7": {
      "name": "$env[animals;kingDragon;v7;name]",
      "emoji": "$env[animals;kingDragon;v7;emoji]",
      "img": "$env[animals;kingDragon;v7;img]",
      "color": "DDAF02"
    },
    "KD8": {
      "name": "$env[animals;kingDragon;v8;name]",
      "emoji": "$env[animals;kingDragon;v8;emoji]",
      "img": "$env[animals;kingDragon;v8;img]",
      "color": "f63413"
    }
  }]`
}