module.exports = [{
  name: "raretry",
  aliases: ["rt"],
  type: "messageCreate",
  code: `
    $reply

    $onlyIf[$getGlobalVar[botEnabled]]
    $onlyIf[$getUserVar[isBanned]==false]
    $onlyIf[$getUserVar[acceptedRules];$callFunction[rulesSchema;]]
    $onlyIf[$getUserVar[onSlowmode]==false]
  
    $let[cdTime;10s]
    $if[$getUserVar[dev]==false;  $userCooldown[$commandName;$get[cdTime];$callFunction[cooldownSchema;$commandName]]  ]
  
    $jsonLoad[userPacks;$getUserVar[userPacks]]
    $jsonLoad[catchedRareCategories;$getUserVar[catchedRareCategories]]
    $jsonLoad[raretryVarData;$getGlobalVar[raretryVarData]]
    $arrayLoad[categories;,;Common,Uncommon,Rare,Epic,Legendary,Extreme,Godly,Pakistani,Imposs,USSR]

    $jsonLoad[raresGroup;$readFile[json/raretry_data.json]] $c[⬅️ Loading data from json with all "rare" categories]

    $loop[1;

        $switch[$getUserVar[rtMode];
            $case[inferno;$let[rtModeNum;-1]]
            $case[default;$let[rtModeNum;0]]
            $case[medium;$let[rtModeNum;1]]
            $case[hard;$let[rtModeNum;2]]
            $case[insane;$let[rtModeNum;3]]
            $case[impossible;$let[rtModeNum;4]]
        ]

        $c[⬇️ Base variables if nothing catched]
        $let[p;-1]
        $let[color;$getGlobalVar[errorColor]]
        $let[MC;0]
        $let[thumbnail;]


        ${catchingRare()}
        ${thumbnailAndArray()}
        ${ifNothing()}          $c[⬅️ Content if nothing catched]
        ${ifKDWithSkins()}      $c[⬅️ If rare equals King Dragon and we have skin for it]

        $callFunction[sumMC;$get[MC]] $c[⬅️ Custom function to add coins to balance]

        $sendMessage[$channelID;
            $color[$get[color]]
            $description[$get[content]]
            $thumbnail[$get[thumbnail]]
            $author[$userDisplayName • MUID: $getUserVar[MUID];$userAvatar]
            $footer[$if[$get[p]>-1;Rarity: 1/$get[baseChance] • Category: $get[cat] • ]Raretry mode: $getUserVar[rtMode]]
        ]
    
    $wait[1s]]

    $callFunction[logSchema;$commandName] $c[⬅️ Custom function to log when someone used command]
    `
}]

// Functions

function colorAndCoins() {
    return `
    $if[$get[p]>-1;$let[color;$env[raresGroup;category_$get[p];color]]]

    $if[$getUserVar[rtMode]!=inferno;
        $let[index;$math[$get[p] + $get[rtModeNum]]]
        $let[MC;$math[$env[raretryVarData;coinsForRaretry;other;$get[index]] * $advancedReplace[$env[raretryVarData;multipliersForRaretry;$get[rtModeNum]];\n;;";;\\];;\\[;]]]
    ;
        $let[MC;$env[raretryVarData;coinsForRaretry;inferno;$get[p]]]
    ]`
}

function baseChance(par) {
    return`
    $if[$getUserVar[rtMode]!=inferno;
        $let[baseChance;$env[raretryVarData;chancesForRaretry;other;$math[$get[${par}] + $get[rtModeNum]]]]
    ;
        $let[baseChance;$env[raretryVarData;chancesForRaretry;inferno;$get[${par}]]]
    ]`
}

function thumbnailAndArray() {
    return `
    $if[$get[p]>-1;

        $arrayLoad[thumbnails;,;$advancedReplace[$env[raresGroup;category_$get[p];thumbnail];\n;;";;\\];;\\[;]]   $c[⬅️ Making and fixing thumbnail array from json object]
        $arrayLoad[contents;,;$advancedReplace[$env[raresGroup;category_$get[p];content];\n;;";;\\];;\\[;]]       $c[⬅️ Making and fixing content array from json object]

    
        $let[thumbnailAndContentIndex;$arrayRandomIndex[thumbnails]]
        $let[thumbnail;$arrayAt[thumbnails;$get[thumbnailAndContentIndex]]]     $c[⬅️ Getting random thumbnail from saved array]
        $let[content;$arrayAt[contents;$get[thumbnailAndContentIndex]]]         $c[⬅️ Getting random content from saved array]

    ]`
}

function ifNothing() {
    return `
    $if[$get[p]==-1; 
        $let[content;## $randomText[You tried to get rares but you got nothing;You tried to get rares but ended up with nothing;You went raretrying but found nothing this time;You tried your luck with rares but didn’t find any;You were farming for rares but got nothing special;You tried evolving into a rare but failed].] 
    ;
        $let[content;## $randomText[You tried to get rares and you got;You tried to get rares and picked;You tried your luck with rares and got;You went after rares and got;You tried evolving into a rare and succeeded with] __$get[content]__]
    
        $if[$get[MC]!=0;
            $let[content;$get[content] $randomText[earning;gaining;collecting;scoring] $separateNumber[$get[MC];.]$getGlobalVar[emoji]]
        ]

        $let[content;$get[content]!]
    ]`
}

function ifKDWithSkins() {
    return `
    $if[$and[$get[p]==6;$get[thumbnailAndContentIndex]==0;$and[$env[userPacks;legacySP];$env[userPacks;goldenSP];$env[userPacks;lockedSP];$env[userPacks;storefrontSP]]];
        
        $addActionRow
        $addStringSelectMenu[luckkdmenu-$authorID;Choose an upgrade:]
        $addOption[King Dragon;;$getUserVar[rtMode]luckkd-$authorID;<:kingdragonseason2:1280238249360494825>]
    
        $if[$env[userPacks;legacySP];
            $addOption[King Dragon;;$getUserVar[rtMode]luckoldkd-$authorID;<:king_dragon:715588377650528398>]
        ]
        
        $if[$env[userPacks;goldenSP];
            $addOption[Golden King Dragon;;$getUserVar[rtMode]luckgkd-$authorID;<:golden_kd:73548382105056053>;]
        ]
    
        $if[$env[userPacks;lockedSP];
            $addOption[King Ripper;;$getUserVar[rtMode]luckkr-$authorID;<:king_ripper:735483931851227264>]
            $addOption[King Stan;;$getUserVar[rtMode]luckkst-$authorID;<:king_stan:735484001275609118>]
            $addOption[King Shah;;$getUserVar[rtMode]luckksh-$authorID;<:king_shah:735484059500806174>]
            $addOption[Queen Celeste;;$getUserVar[rtMode]luckqc-$authorID;<:queen_celeste:735484190187061268>]
            $addOption[Queen Scarlet;;$getUserVar[rtMode]luckqs-$authorID;<:queen_scarlet:735484138949312582>]
        ]
    
        $if[$env[userPacks;storefrontSP];
            $addOption[Queen Flame;;$getUserVar[rtMode]luckqf-$authorID;<:queen_flame:884030972629229568>]
        ]
    
        $let[MC;0]
        $let[thumbnail;]
        $let[content;## Choose an upgrade:\n# <:kingdragonseason2:1280238249360494825> $if[$env[userPacks;legacySP];<:king_dragon:715588377650528398>] $if[$env[userPacks;goldenSP];<:golden_kd:735483821050560583>] $if[$env[userPacks;lockedSP];<:king_ripper:735483931851227264> <:king_stan:735484001275609118> <:king_shah:735484059500806174> <:queen_celeste:735484190187061268> <:queen_scarlet:735484138949312582>] $if[$env[userPacks;storefrontSP];<:queen_flame:884030972629229568>]]
    ]`
}

function catchingRare() {
    return `
    $if[$and[$getUserVar[dev]!=false;$message[0]!=;$isNumber[$message[0]];$message[0]>=-1;$message[0]<=9]; $c[⬅️ Summon specific category by message]
        $let[p;$message[0]]

        ${baseChance(`p`)}
        ${colorAndCoins()}
        $let[cat;$arrayAt[categories;$get[p]]]

    ;
        $let[i;9]

        $loop[10;
            ${baseChance(`i`)}

            $if[1==$randomNumber[1;$sum[1;$get[baseChance]]]; $c[⬅️ If random number from 1 to base chance (from json) = 1 (that means we catched rare), getting coins and color from json and saving iteration as "p" variable]
                $let[p;$get[i]]
                $jsonSet[catchedRareCategories;$getUserVar[rtMode];$get[p];$sum[$env[catchedRareCategories;$getUserVar[rtMode];$get[p]];1]]
                $setUserVar[catchedRareCategories;$env[catchedRareCategories]]
                $let[cat;$arrayAt[categories;$get[p]]]
                ${colorAndCoins()}
                $break
            ]

            $let[i;$math[$get[i] - 1]]
        ]
    ]`
}
