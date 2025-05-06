module.exports = [{ 
name: "raretry", 
aliases: ["rt"], 
type: "messageCreate", 
code: `
    
$reply

$let[cdTime;5m]
$callFunction[checking;]
$callFunction[cooldown;$get[cdTime]]

$jsonLoad[animals;$readFile[json/animals.json]]
$jsonLoad[caughtRareCategories;$getUserVar[caughtRareCategories]]
$jsonLoad[raretryVarData;$getGlobalVar[raretryVarData]]

$jsonLoad[userWardrobe;$getUserVar[userWardrobe]]
$jsonLoad[raresGroup;$eval[$callFunction[raretryData;];false]]

$arrayLoad[categories;,;$advancedReplace[$env[raretryVarData;categories]; ;;\n;;";;\\];;\\[;]]

$jsonLoad[l10n;$readFile[json/localizations.json]]
$let[l10n;$getUserVar[l10n]]

$loop[3;
    $arrayLoad[content$env[i];--;$if[${rep()}==;textNotFound | ID: $get[l10n]$env[i];${rep()}]]
    $let[raretryDesc$env[i];$env[l10n;raretry;raretryDesc$env[i];$get[l10n]]]
    $if[$get[raretryDesc$env[i]]==;$let[raretryDesc$env[i];textNotFound | ID: $get[l10n]$env[i]]]
;i;desc]


$let[al;$arrayLength[categories]]
$let[li;$math[$get[al] - 1]]

$loop[300;
  $switch[$getUserVar[rtMode];
    $case[inferno;$let[rtModeNum;-1]]
    $case[default;$let[rtModeNum;0]]
    $case[medium;$let[rtModeNum;1]]
    $case[hard;$let[rtModeNum;2]]
    $case[insane;$let[rtModeNum;3]]
    $case[impossible;$let[rtModeNum;4]]
  ]

  $c[⬇️ Default variables for unsuccessful attempts]
  $let[p;-1]
  $let[color;$getGlobalVar[errorColor]]
  $let[MC;0]
  $let[caught;false]
  $let[content;## $arrayRandomValue[content1]] 
  $let[thumbnail;]
  ${catchingRare()}
      

$wait[1s];msgi;desc]

$sendMessage[$channelID;<@$authorID> The command loop has ended!]
`
}]

// Functions

function colorAndCoins() {
    return `
    $let[color;$env[raresGroup;category_$get[p];color]]

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
    $arrayLoad[thumbnails;,;$advancedReplace[$env[raresGroup;category_$get[p];thumbnail];\n;;";;\\];;\\[;]]   $c[⬅️ Making and fixing thumbnail array from json object]
    $arrayLoad[contents;,;$advancedReplace[$env[raresGroup;category_$get[p];content];\n;;";;\\];;\\[;]]       $c[⬅️ Making and fixing content array from json object]


    $let[thumbnailAndContentIndex;$arrayRandomIndex[thumbnails]]
    $let[thumbnail;$arrayAt[thumbnails;$get[thumbnailAndContentIndex]]]     $c[⬅️ Getting random thumbnail from saved array]
    $let[animal;$arrayAt[contents;$get[thumbnailAndContentIndex]]]         $c[⬅️ Getting random content from saved array]

    `
}

function content() {
    return `
    $let[content;$arrayRandomValue[content2] __$get[animal]__]

    $if[$get[MC]!=0;
        $let[content;$get[content] $arrayRandomValue[content3] $separateNumber[$get[MC];.]$getGlobalVar[emoji]]
    ]

    $let[content;## $get[content]!]
    `
}

function catchingRare() {
return `
$if[$and[$getUserVar[dev];$message[0]!=;$isNumber[$message[0]];$message[0]>=-1;$message[0]<=$get[li]]; $c[⬅️ Summon specific category by message]
    $let[p;$message[0]]
    $let[caught;true]

    ${baseChance(`p`)}
    ${colorAndCoins()}
    $let[cat;$arrayAt[categories;$get[p]]]
    ${thumbnailAndArray()}
    ${content()}          $c[⬅️ Content if something caught]

    $callFunction[sumMC;$get[MC]] $c[⬅️ Custom function to add coins to balance]

    ${sm()}

;
    $let[i;$get[li]]

    $loop[$get[al];     $c[⬅️ Looping through all categories]
        ${baseChance(`i`)}

        $if[1==$randomNumber[1;$sum[1;$get[baseChance]]]; $c[⬅️ If random number from 1 to base chance (from json) = 1 (that means we caught rare), getting coins and color from json and saving iteration as "p" variable]
            $let[caught;true]
            $let[p;$get[i]]

            $jsonSet[caughtRareCategories;$getUserVar[rtMode];$get[p];$sum[$env[caughtRareCategories;$getUserVar[rtMode];$get[p]];1]]

            $setUserVar[caughtRareCategories;$env[caughtRareCategories]]

            $let[cat;$arrayAt[categories;$get[p]]]

            ${colorAndCoins()}
            ${thumbnailAndArray()}
            ${content()}          $c[⬅️ Content if something caught]


            $callFunction[sumMC;$get[MC]] $c[⬅️ Custom function to add coins to balance]

            ${sm()}
        ]

        $let[i;$math[$get[i] - 1]]
    ]

    $if[$get[caught]==false;
        ${sm()}
    ]
]`
}

function sm() {
return `
$sendMessage[$channelID;
    Attempt: $env[msgi]
    $color[$get[color]]
    $description[$get[content]]
    $thumbnail[$get[thumbnail]]
    $getGlobalVar[author]
    $footer[$if[$get[p]>-1;$get[raretryDesc1]: 1/$separateNumber[$get[baseChance];,] • $get[raretryDesc2]: $get[cat] • ]$get[raretryDesc3]: $toTitleCase[$getUserVar[rtMode]]]
]`
}

function rep() {
return `$advancedReplace[$env[l10n;raretry;contents;content$env[i];$get[l10n]];\n\\];;\\[\n;;\n;--;",;;";]`
}