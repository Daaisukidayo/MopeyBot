module.exports = [{
  name: "caughtrares",
  aliases: ["cr", "chances", "ch", "rares"],
  type: "messageCreate",
  code: `
    $reply

    $let[cdTime;1m]
    $callFunction[checking;]
    $callFunction[cooldown;$get[cdTime]]

    $let[rtMode;$getUserVar[rtMode]]
    ${jsonAndArray()}


    $reply
    $let[msgid;$sendMessage[$channelID;${emptyEmbed()};true]]

    $switch[$get[rtMode];
        $case[inferno;      $setMessageVar[crpage;1;$get[msgid]]]
        $case[default;      $setMessageVar[crpage;2;$get[msgid]]]
        $case[medium;       $setMessageVar[crpage;3;$get[msgid]]]
        $case[hard;         $setMessageVar[crpage;4;$get[msgid]]]
        $case[insane;       $setMessageVar[crpage;5;$get[msgid]]]
        $case[impossible;   $setMessageVar[crpage;6;$get[msgid]]]
    ]

    ${rtModeNum()}
    ${buttons()}

    $!editMessage[$channelID;$get[msgid];${embed()}]

    $setTimeout[ 
        ${buttons(`true`)}
        $!editMessage[$channelID;$get[msgid];${embed()} $color[GRAY] $get[specialDesc1]]
        $deleteMessageVar[crpage;$get[msgid]]  
    ;$get[cdTime]]

    $deferUpdate
  `,
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["button"],
  code: `
    $textSplit[$customID;-]
    $onlyIf[$splitText[1]==$authorID;  $callFunction[notYourBTN;]  ]
    $onlyIf[$or[$splitText[0]==left_cr;$splitText[0]==right_cr]]
    $onlyIf[$getMessageVar[crpage;$messageID]!=;  $callFunction[interFail;]  ]

    $let[msgid;$messageID]

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
    ${jsonAndArray()}

    ${rtModeNum()}
    ${buttons()}


    $!editMessage[$channelID;$get[msgid];${embed()}]

    $deferUpdate
  `,
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["button"],
  code: `
    $textSplit[$customID;-]

    $onlyIf[$splitText[1]==$authorID;  $callFunction[notYourBTN;]  ]
    $onlyIf[$splitText[0]==setmode]
    $onlyIf[$getMessageVar[crpage;$messageID]!=;  $callFunction[interFail;]  ]


    $let[msgid;$messageID]
    $let[rtMode;$splitText[2]]
    ${jsonAndArray()}
    ${rtModeNum()}
    $setUserVar[rtMode;$get[rtMode]]
    ${buttons()}

    $!editMessage[$channelID;$get[msgid];${embed()} $replace[$get[desc8];{6};\`$splitText[2]\`]]

    $deferUpdate
  `,
}];

// functions

function emptyEmbed() {
  return `
    $getGlobalVar[author]
    $color[$getGlobalVar[luckyColor]]
    $description[$get[desc1]]
  `;
}

function embed() {
  return `
    $title[$replace[$get[desc2];{0};$toTitleCase[$get[rtMode]]]]
    $getGlobalVar[author]
    $description[${loop()}]
    $color[$getGlobalVar[luckyColor]]
    $footer[$replace[$get[desc3];{1};$getMessageVar[crpage;$get[msgid]]]/6]
  `;
}

function loop() {
  return `
    $let[i;0]
    $loop[$arrayLength[categories];$return[$addField[$arrayAt[categories;$get[i]];**$codeBlock[$replace[$get[desc4];{2};$separateNumber[$env[caughtRareCategories;$get[rtMode];$get[i]];,]]\n$replace[$get[desc5];{3};1/$separateNumber[${chance()};,]]\n$replace[$get[desc6];{4};$separateNumber[${coins()};,]];JS]**] $let[i;$math[$get[i] + 1]]]]
  `;
}

function jsonAndArray() {
  return `
    $jsonLoad[raretryVarData;$getGlobalVar[raretryVarData]]
    $jsonLoad[caughtRareCategories;$getUserVar[caughtRareCategories]]
    $arrayLoad[categories;,;$advancedReplace[$env[raretryVarData;categories]; ;;\n;;";;\\];;\\[;]]

    $jsonLoad[l10n;$readFile[json/localizations.json]]
    $let[l10n;$getUserVar[l10n]]
    $let[specialDesc1;$env[l10n;special;specialDesc1;$get[l10n]]] 

    $loop[8; 
        $let[desc$env[i];$env[l10n;caughtRares;caughtRaresDesc$env[i];$get[l10n]]]
        $if[$get[desc$env[i]]==; $let[desc$env[i];textNotFound | ID: $get[l10n]$env[i]]] 
    ;i;desc]
  `;
}

function chance() {
  return `$if[$get[rtMode]!=inferno;  $env[raretryVarData;chancesForRaretry;other;$math[$get[i] + $get[rtModeNum]]]   ;   $env[raretryVarData;chancesForRaretry;inferno;$get[i]]]`
}

function coins() {
  return `$if[$get[rtMode]!=inferno;  $math[$env[raretryVarData;coinsForRaretry;other;$math[$get[i] + $get[rtModeNum]]] * $advancedReplace[$env[raretryVarData;multipliersForRaretry;$get[rtModeNum]];\n;;";;\\];;\\[;]]   ;   $env[raretryVarData;coinsForRaretry;inferno;$get[i]]]`
}

function rtModeNum() {
  return `
    $switch[$get[rtMode];
        $case[inferno;      $let[rtModeNum;-1]]
        $case[default;      $let[rtModeNum;0]]
        $case[medium;       $let[rtModeNum;1]]
        $case[hard;         $let[rtModeNum;2]]
        $case[insane;       $let[rtModeNum;3]]
        $case[impossible;   $let[rtModeNum;4]]
    ]
  `;
}

function buttons(disable = false) {
  return `
    $addActionRow
    $addButton[left_cr-$authorID;;Primary;⬅️;${disable}]
    $addButton[right_cr-$authorID;;Primary;➡️;${disable}]

    $let[label;$replace[$get[desc7];{5};$toTitleCase[$get[rtMode]]]]
    
    $if[$getUserVar[rtMode]!=$get[rtMode];
        $addButton[setmode-$authorID-$get[rtMode];$get[label];Success;;${disable}]
    ;
        $addButton[setmode-$authorID-$get[rtMode];$get[label];Secondary;;true]
    ]
  `;
}