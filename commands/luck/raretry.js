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
    $jsonLoad[coinsForRaretry;$getGlobalVar[coinsForRaretry]]
    $arrayLoad[multipliersForRaretry;,;$getGlobalVar[multipliersForRaretry]]
    $jsonLoad[chancesForRaretry;$getGlobalVar[chancesForRaretry]]
    $jsonLoad[raresGroup;$readFile[json/raretry_data.json]] $c[⬅️ Loading data from json with all "rare" categories]


    $switch[$getUserVar[rtMode];
        $case[inferno;$let[rtModeNum;0]]
        $case[default;$let[rtModeNum;0]]
        $case[medium;$let[rtModeNum;1]]
        $case[hard;$let[rtModeNum;2]]
        $case[insane;$let[rtModeNum;3]]
        $case[impossible;$let[rtModeNum;4]]
    ]

    $c[⬇️ Base variables if nothing catched]
    $let[p;0]
    $let[color;$getGlobalVar[errorColor]]
    $let[MC;0]
    $let[thumbnail;]


    $if[$and[$getUserVar[dev]!=false;$message[0]!=;$isNumber[$message[0]];$message[0]>=0;$message[0]<=10]; $c[⬅️ Summon specific category by message]
        $let[p;$message[0]]

        ${colorAndCoins()}
        ${baseChance(`p`)}
    ;
        $let[i;10]

        $loop[10;
            ${baseChance(`i`)}

            $if[1==$randomNumber[1;$sum[1;$get[baseChance]]]; $c[⬅️ If random number from 1 to base chance (from json) = 1 (that means we catched rare), getting coins and color from json and saving iteration as "p" variable]
                $let[p;$get[i]]
                ${colorAndCoins()}
                $break
            ]

            $let[i;$math[$get[i] - 1]]
        ]
    ]
    


    $if[$get[p]>0;

        $arrayLoad[thumbnails;,;$advancedReplace[$env[raresGroup;category_$get[p];thumbnail];\n;;";;\\];;\\[;]]   $c[⬅️ Making and fixing thumbnail array from json object]
        $arrayLoad[contents;,;$advancedReplace[$env[raresGroup;category_$get[p];content];\n;;";;\\];;\\[;]]       $c[⬅️ Making and fixing content array from json object]

    
        $let[thumbnailAndContentIndex;$arrayRandomIndex[thumbnails]]
        $let[thumbnail;$arrayAt[thumbnails;$get[thumbnailAndContentIndex]]]     $c[⬅️ Getting random thumbnail from saved array]
        $let[content;$arrayAt[contents;$get[thumbnailAndContentIndex]]]         $c[⬅️ Getting random content from saved array]

    ]


    $if[$get[p]==0; $c[⬅️ Content if nothing catched]
        $let[content;## $randomText[You tried to get rares but you got nothing;You tried to get rares but ended up with nothing;You went raretrying but found nothing this time;You tried your luck with rares but didn’t find any;You were farming for rares but got nothing special;You tried evolving into a rare but failed].] 
    ;
        $let[content;## $randomText[You tried to get rares and you got;You tried to get rares and picked;You tried your luck with rares and got;You went after rares and got;You tried evolving into a rare and succeeded with] __$get[content]__]
    
        $if[$get[MC]!=0;
            $let[content;$get[content] $randomText[earning;gaining;collecting;scoring] $separateNumber[$get[MC];.]$getGlobalVar[emoji]]
        ]

        $let[content;$get[content]!]
    ] 

    $c[⬇️ If rare equals King Dragon and we have skin for it]
    $if[$and[$get[p]==7;$get[thumbnailAndContentIndex]==0;$and[$env[userPacks;legacySP];$env[userPacks;goldenSP];$env[userPacks;lockedSP];$env[userPacks;storefrontSP]]];
        
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
    ]


    $callFunction[sumMC;$get[MC]] $c[⬅️ Custom function to add coins to balance]


    $sendMessage[$channelID;
        $color[$get[color]]
        $description[$get[content]]
        $thumbnail[$get[thumbnail]]
        $author[$userDisplayName • MUID: $getUserVar[MUID];$userAvatar]
        $footer[$if[$get[p]>0;Rarity: 1/$get[baseChance] • ]Raretry mode: $getUserVar[rtMode]]
    ]

    $callFunction[logSchema;$commandName] $c[⬅️ Custom function to log when someone used command]
    `
}]

function colorAndCoins() {
    return `
    $let[color;$env[raresGroup;category_$get[p];color]]

    $if[$getUserVar[rtMode]!=inferno;
        $let[index;$math[$get[p] + $get[rtModeNum] - 1]]
        $let[arrIndex;$get[rtModeNum]]
        $let[MC;$math[$env[coinsForRaretry;other;$get[index]] * $advancedReplace[$arrayAt[multipliersForRaretry;$get[arrIndex]];\n;;";;\\];;\\[;]]]
    ;
        $let[index;$math[$get[p] - 1]]
        $let[MC;$env[coinsForRaretry;inferno;$get[index]]]
    ]`
}

function baseChance(par) {
    return`
    $if[$getUserVar[rtMode]!=inferno;
        $let[index;$math[$get[${par}] + $get[rtModeNum] - 1]]
        $let[baseChance;$env[chancesForRaretry;other;$get[index]]]
    ;
        $let[index;$math[$get[${par}] - 1]]
        $let[baseChance;$env[chancesForRaretry;inferno;$get[index]]]
    ]`
}
