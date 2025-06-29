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

    $let[leg;$env[userProfile;userPacks;legacySP]]
    $let[gsp;$env[userProfile;userPacks;goldenSP]]
    $let[lsp;$env[userProfile;userPacks;lockedSP]]
    $let[sfsp;$env[userProfile;userPacks;storefrontSP]]

    $c[King Dragons]

    $let[luckKDs;$env[KDvar;0;emoji] $env[KDvar;1;emoji]]

    $if[$env[userPacks;lockedSP]; 
      $let[luckKDs;$get[luckKDs] $env[KDvar;2;emoji] $env[KDvar;3;emoji] $env[KDvar;4;emoji] $env[KDvar;5;emoji] $env[KDvar;6;emoji]]
    ]
    
    $if[$env[userPacks;storefrontSP]; 
      $let[luckKDs;$get[luckKDs] $env[KDvar;7;emoji]]
    ]

    $if[$env[userPacks;goldenSP]; 
      $let[luckKDs;$get[luckKDs] $env[KDvar;8;emoji]]
    ]

    $c[Black Dragons]

    $let[normalBDs;$env[BDvar;0;emoji] $env[BDvar;1;emoji]]
    
    $if[$get[lsp];
      $let[normalBDs;$get[normalBDs] $env[BDvar;2;emoji]]
    ]
    $if[$get[gsp];
      $let[normalBDs;$get[normalBDs] $env[BDvar;3;emoji]]
    ]
    $if[$get[leg]; 
      $let[normalBDs;$get[normalBDs] $env[BDvar;4;emoji]]
    ]

    $let[r;1000]
    $if[$env[userProfile;devMode];
      $let[r;5]
    ]



    $c[Embed]

    $getGlobalVar[author]

    $if[$randomNumber[1;$sum[1;$get[r]]]==1;
      $callFunction[kdMenu;luck2]
      $description[## Choose an upgrade:
      # $get[luckKDs]]
      $color[d61b4a]
    ;
      ${bdMenu()}
      $description[## Choose an upgrade:
      # $get[normalBDs]]
      $color[$getGlobalVar[defaultColor]]
    ]
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["selectMenu"],
  description: "showing king dragon upgrade menu",
  code: `
    $textSplit[$selectMenuValues;-]
    $onlyIf[$splitText[1]==$authorID;  $callFunction[notYourBTN;]  ]
    $onlyIf[$or[$splitText[0]==legbd;$splitText[0]==bds1;$splitText[0]==bds2;$splitText[0]==gbd;$splitText[0]==ab]]

    $jsonLoad[userProfile;$getUserVar[userProfile]]

    ${jsons()}
    $jsonLoad[content;${content1()}]

    $getGlobalVar[author]

    $if[$randomNumber[1;101]>=40;

      $let[normalKDs;$env[KDvar;0;emoji] $env[KDvar;1;emoji]]

      $if[$env[userPacks;lockedSP]; 
        $let[normalKDs;$get[normalKDs] $env[KDvar;2;emoji] $env[KDvar;3;emoji] $env[KDvar;4;emoji] $env[KDvar;5;emoji] $env[KDvar;6;emoji]]
      ]
      
      $if[$env[userPacks;storefrontSP]; 
        $let[normalKDs;$get[normalKDs] $env[KDvar;7;emoji]]
      ]

      $if[$env[userPacks;goldenSP]; 
        $let[normalKDs;$get[normalKDs] $env[KDvar;8;emoji]]
      ]

      $description[## Choose an upgrade:
      # $get[normalKDs]]
      $color[$getGlobalVar[defaultColor]]
      $callFunction[kdMenu;normal]

    ; 

      $switch[$splitText[0];
        $case[bds1; $let[BD;$env[BDvar;0;name] $env[BDvar;0;emoji]]]
        $case[bds2; $let[BD;$env[BDvar;1;name] $env[BDvar;1;emoji]]]
        $case[ab;   $let[BD;$env[BDvar;2;name] $env[BDvar;2;emoji]]]
        $case[gbd;  $let[BD;$env[BDvar;3;name] $env[BDvar;3;emoji]]]
        $case[legbd;$let[BD;$env[BDvar;4;name] $env[BDvar;4;emoji]]]
      ]

      $let[content;$advancedReplace[$arrayRandomValue[content];{0};$randomNumber[1;12];{1};$arrayRandomValue[KDS]]]

      $let[MC;$randomNumber[1000;1501]]
      $callFunction[sumMC;$get[MC]]
      $description[## You tried to get King Dragon as __$get[BD]__ $get[content]... Atleast you got $separateNumber[$get[MC];,]$getGlobalVar[emoji] from this run!]
      $color[$getGlobalVar[errorColor]]
    ]
    $!editMessage[$channelID;$messageID]

    $setUserVar[userProfile;$env[userProfile]]

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

    $jsonLoad[userProfile;$getUserVar[userProfile]]

    ${jsons()}
    ${KDNum()}

    $let[MC;$randomNumber[3500;5001]]
    $callFunction[sumMC;$get[MC]]

    $description[## You upgraded to __$env[KDvar;$get[kd];name] $env[KDvar;$get[kd];emoji]__ and you earned $separateNumber[$get[MC];,]$getGlobalVar[emoji]!]
    $getGlobalVar[author]
    $color[$env[colors;$get[kd]]]
    $thumbnail[$env[KDvar;$get[kd];img]]
    $!editMessage[$channelID;$messageID]

    $setUserVar[userProfile;$env[userProfile]]
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

    $jsonLoad[userProfile;$getUserVar[userProfile]]
    
    ${jsons()}
    ${KDNum()}

    $let[MC;250000]
    $callFunction[sumMC;$get[MC]]

    $color[d61b4a]
    $getGlobalVar[author]

    $thumbnail[$env[KDvar;$get[kd];img]]
    $footer[Rarity: 1/1000]
    $description[## You were trying to upgrade to Black Dragon, but suddenly you saw a different animal, it was __$env[KDvar;$get[kd];name] $env[KDvar;$get[kd];emoji]__ by luck in your upgrade menu! You were surprised and happy! You also earned $separateNumber[$get[MC];,]$getGlobalVar[emoji] from playing!]
    $!editMessage[$channelID;$messageID]

    $setUserVar[userProfile;$env[userProfile]]
  `
}]


function bdMenu() {
  return `  
    $addActionRow
    $addStringSelectMenu[bdmenu-$authorID;Choose an upgrade:]

    $addOption[$env[BDvar;0;name];;bds1-$authorID;$env[BDvar;0;emoji]]
    $addOption[$env[BDvar;1;name];;bds2-$authorID;$env[BDvar;1;emoji]]
    
    $if[$get[lsp];
      $addOption[$env[BDvar;2;name];;ab-$authorID;$env[BDvar;2;emoji]]
    ]
    
    $if[$get[gsp];
      $addOption[$env[BDvar;3;name];;gbd-$authorID;$env[BDvar;3;emoji]]
    ]

    $if[$get[leg];
      $addOption[$env[BDvar;4;name];;legbd-$authorID;$env[BDvar;4;emoji]]
    ]
  `
}

function jsons() {
  return `
    $jsonLoad[animals;$readFile[json/animals.json]]
    $jsonLoad[userPacks;$env[userProfile;userPacks]]
    $jsonLoad[BDvar;$env[animals;blackDragon;variants]]
    $jsonLoad[KDvar;$env[animals;kingDragon;variants]]
    $arrayLoad[colors;  ;24272b 24272b 731C1F 9D3F0E 6E141A 5EB2FF B62323 DDAF02 f63413]
  `
}

function content1 () {
  return `
    [
      "but you got killed by teamers",
      "but your internet fell off and you disconnected with {0} apexes away",
      "but Mistik made an event so you lost your BD",
      "but rares bullied and killed you",
      "but you died by another BD",
      "But you died by low lava",
      "but there was a {1} in the server so you were killed"
    \\]
  `
}

function KDNum () {
  return `
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
  `
}