const CD = "1m"

module.exports = [{
  name: "shop",
  type: "messageCreate",
  code: `
    $reply
    $callFunction[checking;]
    $callFunction[cooldown;${CD}]

    $jsonLoad[userPacks;$getUserVar[userPacks]]

    $let[msgid;$sendMessage[$channelID;${embedShop()};true]]

    ${shop()}

    $let[desc;]
    $let[i;0]


    
    $addActionRow
    $addStringSelectMenu[shop-$authorID;Choose a Skinpack!]

    $arrayForEach[allSkinPacks;obj;
        $jsonLoad[pack;$env[obj]]

        $if[$env[userPacks;$env[pack;name]]!=true;
             $letSum[i;1]
            $addOption[$env[pack;description];$separateNumber[$env[pack;cost];,];$env[pack;name]+$env[pack;cost]-$authorID;$getGlobalVar[emoji]]
        ]
    ]

    $if[$get[i]==0;
        $addOption[.;;.]
        $editStringSelectMenu[shop-$authorID;shop-$authorID;There is nothing to buy!;true]
    ]


    $!editMessage[$channelID;$get[msgid];${embedShop()}]
    


  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["selectMenu"],
  code: `
    $textSplit[$selectMenuValues;-]
    $onlyIf[$splitText[1]==$authorID;  $callFunction[notYourBTN;]  ]

    $textSplit[$splitText[0];+]

    ${shop()}
    $arrayLoad[trig]
    $arrayForEach[allSkinPacks;obj;
        $jsonLoad[pack;$env[obj]]
        $arrayPush[trig;$env[pack;name]]
    ]

    $onlyIf[$arrayIncludes[trig;$splitText[0]]]

    $jsonLoad[userPacks;$getUserVar[userPacks]]

    $onlyIf[$env[userPacks;$splitText[0]]!=true;
        $ephemeral 
        $interactionReply[## You already own it!]
    ]
    $onlyIf[$getUserVar[MC]>=$splitText[1];
        $ephemeral 
        $interactionReply[## You don't have enough $getGlobalVar[emoji]!]
    ]

    $callFunction[subMC;$splitText[1]]

    $!jsonSet[userPacks;$splitText[0];true]
    $setUserVar[userPacks;$env[userPacks]]

    $interactionReply[
        $ephemeral
        $getGlobalVar[author]
        $description[## Successfully purchased!]
        $color[$getGlobalVar[defaultColor]]
    ]
        
    $let[i;0]


    $addActionRow
    $addStringSelectMenu[shop-$authorID;Choose a Skinpack!]

    $arrayForEach[allSkinPacks;obj;
        $jsonLoad[pack;$env[obj]]

        $if[$env[userPacks;$env[pack;name]]!=true;
            $letSum[i;1]
            $addOption[$env[pack;description];$separateNumber[$env[pack;cost];,];$env[pack;name]+$env[pack;cost]-$authorID;$getGlobalVar[emoji]]
        ]
    ]

    $if[$get[i]==0;
        $addOption[.;;.]
        $editStringSelectMenu[shop-$authorID;shop-$authorID;There is nothing to buy!;true]
    ]


    $!editMessage[$channelID;$messageID;${embedShop()}]
    
  `
}]


function embedShop() {
return `
$getGlobalVar[author]
$title[__Available Skinpacks__]
$color[$getGlobalVar[defaultColor]]
`}

function shop() {
return `
$arrayLoad[allSkinPacks;, ;{
    "name": "legacySP",
    "description": "Legacy Skinpack",
    "cost": "2000000"
}, {
    "name": "storefrontSP",
    "description": "Storefront Skinpack",
    "cost": "11000000"
}, {
    "name": "summerSP",
    "description": "Summer Skinpack",
    "cost": "28499200"
}, {
    "name": "goldenSP",
    "description": "Golden Skinpack",
    "cost": "10820000"
}, {
    "name": "lockedSP",
    "description": "Locked Skinpack",
    "cost": "14229000"
}, {
    "name": "halloweenSP",
    "description": "Halloween Skinpack",
    "cost": "80344400"
}, {
    "name": "landGTSP",
    "description": "Land Gold-Trim Skinpack",
    "cost": "1250000"
}, {
    "name": "desertGTSP",
    "description": "Desert Gold-Trim Skinpack",
    "cost": "1250000"
}, {
    "name": "oceanGTSP",
    "description": "Ocean Gold-Trim Skinpack",
    "cost": "1250000"
}, {
    "name": "arcticGTSP",
    "description": "Arctic Gold-Trim Skinpack",
    "cost": "1250000"
}]
`
}