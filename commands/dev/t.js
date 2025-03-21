module.exports = [{
  name: "t",
  type: "messageCreate",
  code: `
  
    $onlyIf[$authorID==$botOwnerID]
    $reply

    $onlyIf[$getGlobalVar[botEnabled]]
    $onlyIf[$getUserVar[isBanned]==false]
    $onlyIf[$getUserVar[acceptedRules];$callFunction[rulesSchema;]]
    $onlyIf[$getUserVar[onSlowmode]==false]
  
    $let[cdTime;10s]
    $if[$getUserVar[dev]==false;  $userCooldown[$commandName;$get[cdTime];$callFunction[cooldownSchema;$commandName]]  ]
  
    $jsonLoad[userPacks;$getUserVar[userPacks]]


    $let[default_mc_10;1000000]
    $let[default_mc_9;500000]
    $let[default_mc_8;200000]
    $let[default_mc_7;75000]
    $let[default_mc_6;15000]
    $let[default_mc_5;5000]
    $let[default_mc_4;1500]
    $let[default_mc_3;500]
    $let[default_mc_2;0]
    $let[default_mc_1;0]


    $try[

        $jsonLoad[raresGroup;$readFile[json/raretry_data.json]] 
    
        $let[i;10]
        $let[p;0]
        $let[color;d0321d]
        $let[MC;0]
        $let[thumbnail;]


        $loop[10;
            $let[baseChance;$env[raresGroup;category_$get[i];chance;$getUserVar[rtMode]]]
            
            $if[1==$randomNumber[1;$sum[1;$get[baseChance]]];
                $let[p;$get[i]]
                $let[color;$env[raresGroup;category_$get[i];color]]
                $let[MC;$env[raresGroup;category_$get[i];mc;$getUserVar[rtMode]]]
                $break
            ]
            
            $let[i;$math[$get[i] - 1]]
        ]
    
        
        $if[$and[$getUserVar[dev]!=false;$message[0]!=;$isNumber[$message[0]];$message[0]>=0;$message[0]<=10];
            $let[p;$message[0]]
        ]

        $if[$get[p]>0;

            $arrayLoad[thumbnails;;$env[raresGroup;category_$get[p];thumbnail]]
            $arrayLoad[contents;;$env[raresGroup;category_$get[p];content]]
        
        
            $let[thumbnailAndContentIndex;$randomIndex[thumbnails]]
            $let[thumbnail;$arrayAt[thumbnails;$get[thumbnailAndContentIndex]]]
            $let[content;$arrayAt[contents;$get[thumbnailAndContentIndex]]]
        ]
  
    ;$sendMessage[$channelID;An error occured: $get[err]] $stop;err]
  
  
    $if[$get[p]==0;
        $let[content;## $randomText[You tried to get rares but you got nothing;You tried to get rares but ended up with nothing;You went raretrying but found nothing this time;You tried your luck with rares but didn’t find any;You were farming for rares but got nothing special;You tried evolving into a rare but failed].] 
    ;
        $let[content;## $randomText[You tried to get rares and you got;You tried to get rares and picked;You tried your luck with rares and got;You went after rares and got;You tried evolving into a rare and succeeded with] __$get[content]__]
    
        $if[$get[MC]!=0;
            $let[content;$get[content] $randomText[earning;gaining;collecting;scoring] $separateNumber[$get[MC];.]$getGlobalVar[emoji]]
        ]

        $let[content;$get[content]!]
    ] 
  
    

    $if[$and[$get[p]==7;$get[thumbnailAndContentIndex]==0;$and[$env[userPacks;legacySP];$env[userPacks;goldenSP];$env[userPacks;lockedSP];$env[userPacks;storefrontSP]]];
        
        $addActionRow
        $addStringSelectMenu[luckkdmenu-$authorID;Choose an upgrade:]
        $addOption[King Dragon;;$getUserVar[rtMode]luckkd-$authorID;<:kingdragonseason2:1280238249360494825>]
    
        $if[$env[userPacks;legacySP];
            $addOption[King Dragon;;$getUserVar[rtMode]luckoldkd-$authorID;<:king_dragon:715588377650528398>]
        ]
        
        $if[$env[userPacks;goldenSP];
            $addOption[Golden King Dragon;;$getUserVar[rtMode]luckgkd-$authID;<:golden_kd:73548382105056053>;]
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

    $callFunction[sumMC;$get[MC]]  
  
    $sendMessage[$channelID;
        ExecutionTime: **$executionTimeMS**
        $color[$get[color]]
        $description[$get[content]]
        $thumbnail[$get[thumbnail]]
        $author[$userDisplayName • MUID: $getUserVar[MUID];$userAvatar]
        $footer[$if[$get[p]>0;Rarity: 1/$get[baseChance] • ]Raretry mode: $getUserVar[rtMode]]
    ]
  
    $callFunction[logSchema;$commandName]
    `
}]