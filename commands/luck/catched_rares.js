module.exports = [{ name: "catchedrares", aliases: ["cr"], type: "messageCreate", code: `

$callFunction[checking;]

$let[cdTime;2m]
$callFunction[cooldown;$get[cdTime]]

${jsonAndArray()}

$let[rtMode;$getUserVar[rtMode]]

$reply
$let[msgid;$sendMessage[$channelID; ${emptyEmbed()} $footer[] $description[Loading...];true]]

$switch[$get[rtMode];
    $case[inferno;      $setMessageVar[crpage;1;$get[msgid]]]
    $case[default;      $setMessageVar[crpage;2;$get[msgid]]]
    $case[medium;       $setMessageVar[crpage;3;$get[msgid]]]
    $case[hard;         $setMessageVar[crpage;4;$get[msgid]]]
    $case[insane;       $setMessageVar[crpage;5;$get[msgid]]]
    $case[impossible;   $setMessageVar[crpage;6;$get[msgid]]]
]

$switch[$get[rtMode];
    $case[inferno;      $let[rtModeNum;-1]]
    $case[default;      $let[rtModeNum;0]]
    $case[medium;       $let[rtModeNum;1]]
    $case[hard;         $let[rtModeNum;2]]
    $case[insane;       $let[rtModeNum;3]]
    $case[impossible;   $let[rtModeNum;4]]
]

$addActionRow
$addButton[left_cr-$authorID;;Primary;⬅️]
$addButton[right_cr-$authorID;;Primary;➡️]
$addButton[setmode-$authorID-$get[rtMode];Set mode to $get[rtMode];Secondary;;true]

$!editMessage[$channelID;$get[msgid];${embed()}]

$setTimeout[ 
    $addActionRow
    $addButton[left_cr-$authorID;;Primary;⬅️;true]
    $addButton[right_cr-$authorID;;Primary;➡️;true] 
    $addButton[setmode-$authorID-$get[rtMode];Set mode to $get[rtMode];Secondary;;true]
    $!editMessage[$channelID;$get[msgid];${embed()} $color[GRAY] This message is now inactive. Run the command again.]
    $deleteMessageVar[crpage;$get[msgid]]  
;$get[cdTime]]

$deferUpdate

`},
{ type: "interactionCreate", allowedInteractionTypes: ["button"], code: `

$textSplit[$customID;-]
$onlyIf[$splitText[1]==$authorID;  $callFunction[notYourBTN;]  ]
$onlyIf[$or[$splitText[0]==left_cr;$splitText[0]==right_cr]]
$onlyIf[$getMessageVar[crpage;$messageID]!=;  $callFunction[interFail;]  ]

$let[msgid;$messageID]

${jsonAndArray()}


$if[$splitText[0]==left_cr; 
    $setMessageVar[crpage;$sub[$getMessageVar[crpage;$get[msgid]];1];$get[msgid]]
    $if[$getMessageVar[crpage;$get[msgid]]<1;
        $setMessageVar[crpage;6;$get[msgid]]
    ]
;
    $setMessageVar[crpage;$sum[$getMessageVar[crpage;$get[msgid]];1];$get[msgid]]
    $if[$getMessageVar[crpage;$get[msgid]]>6;
        $setMessageVar[crpage;1;$get[msgid]]
    ]
]



$switch[$getMessageVar[crpage;$get[msgid]];

    $case[1;$let[rtMode;inferno]]
    $case[2;$let[rtMode;default]]
    $case[3;$let[rtMode;medium]]
    $case[4;$let[rtMode;hard]]
    $case[5;$let[rtMode;insane]]
    $case[6;$let[rtMode;impossible]]

]

$switch[$get[rtMode];
    $case[inferno;      $let[rtModeNum;-1]]
    $case[default;      $let[rtModeNum;0]]
    $case[medium;       $let[rtModeNum;1]]
    $case[hard;         $let[rtModeNum;2]]
    $case[insane;       $let[rtModeNum;3]]
    $case[impossible;   $let[rtModeNum;4]]
]

$addActionRow
$addButton[left_cr-$authorID;;Primary;⬅️]
$addButton[right_cr-$authorID;;Primary;➡️]

$if[$getUserVar[rtMode]!=$get[rtMode];
    $addButton[setmode-$authorID-$get[rtMode];Set mode to $get[rtMode];Success]
;
    $addButton[setmode-$authorID-$get[rtMode];Set mode to $get[rtMode];Secondary;;true]
]

$!editMessage[$channelID;$get[msgid];${embed()}]

$deferUpdate


`},
{ type: "interactionCreate", allowedInteractionTypes: ["button"], code: `
$textSplit[$customID;-]

$onlyIf[$splitText[1]==$authorID;  $callFunction[notYourBTN;]  ]
$onlyIf[$splitText[0]==setmode]

$let[msgid;$messageID]
${jsonAndArray()}

$let[rtMode;$splitText[2]]


$switch[$get[rtMode];
    $case[inferno;      $let[rtModeNum;-1]]
    $case[default;      $let[rtModeNum;0]]
    $case[medium;       $let[rtModeNum;1]]
    $case[hard;         $let[rtModeNum;2]]
    $case[insane;       $let[rtModeNum;3]]
    $case[impossible;   $let[rtModeNum;4]]
]

$setUserVar[rtMode;$get[rtMode]]


$addActionRow
$addButton[left_cr-$authorID;;Primary;⬅️]
$addButton[right_cr-$authorID;;Primary;➡️]
$addButton[setmode-$authorID-$get[rtMode];Set mode to $get[rtMode];Secondary;;true]

$!editMessage[$channelID;$get[msgid];${embed()} Your raretry mode is set to \`$splitText[2]\`]

$deferUpdate

`
}]

function emptyEmbed() {
    return `
    $author[$userDisplayName • MUID: $getUserVar[MUID];$userAvatar]
    $color[$getGlobalVar[luckyColor]]
    $description[Loading...]`
}

function embed() {
    return `
    $title[Total catched rares in "$toTitleCase[$get[rtMode]]" mode:]
    $author[$userDisplayName • MUID: $getUserVar[MUID];$userAvatar]
    $!description[${loop()}]
    $color[$getGlobalVar[luckyColor]]
    $footer[Page: $getMessageVar[crpage;$get[msgid]]/6]`
}

function loop() {
    return `
    $let[i;0]
    $loop[$arrayLength[categories];$return[**\`\`\`$arrayAt[categories;$get[i]]: $separateNumber[$env[catchedRareCategories;$get[rtMode];$get[i]];,]\nChance: 1/$separateNumber[${chance()};,]\nCoins: $separateNumber[${coins()};,]\`\`\`** $let[i;$math[$get[i] + 1]]]]`
}

function jsonAndArray() {
    return `
    $jsonLoad[raretryVarData;$getGlobalVar[raretryVarData]]
    $jsonLoad[catchedRareCategories;$getUserVar[catchedRareCategories]]
    $arrayLoad[categories;,;$advancedReplace[$env[raretryVarData;categories]; ;;\n;;";;\\];;\\[;]]`
}

function chance() {
    return `$if[$get[rtMode]!=inferno;$env[raretryVarData;chancesForRaretry;other;$math[$get[i] + $get[rtModeNum]]];$env[raretryVarData;chancesForRaretry;inferno;$get[i]]]`
}

function coins() {
    return `$if[$get[rtMode]!=inferno;$math[$env[raretryVarData;coinsForRaretry;other;$math[$get[i] + $get[rtModeNum]]] * $advancedReplace[$env[raretryVarData;multipliersForRaretry;$get[rtModeNum]];\n;;";;\\];;\\[;]];$env[raretryVarData;coinsForRaretry;inferno;$get[i]] ]`
}