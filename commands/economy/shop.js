const CD = "1m"

module.exports = [{
  name: "shop",
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking;]
    $callFunction[cooldown;${CD}]

    $jsonLoad[userPacks;$getUserVar[userPacks]]

    $let[msgid;$sendMessage[$channelID;${embedShop()};true]]

    ${shop()}

    $let[desc;]
    $let[i;0]

    
    ${genMenu()}
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["selectMenu"],
  code: `
    $textSplit[$selectMenuValues;-]
    
    $onlyif[$splitText[1]==$authorID;
        $callFunction[notYourBTN;]
    ]

    $textSplit[$splitText[0];+]

    $let[skinpack;$splitText[0]]
    $let[cost;$splitText[1]]

    ${shop()}
    $arrayLoad[trig]
    $arrayForEach[allSkinPacks;pack;
      $arrayPush[trig;$env[pack;name]]
    ]

    $onlyIf[$arrayIncludes[trig;$get[skinpack]]]

    $!stopTimeout[SHOP-$authorID]

    $jsonLoad[userProfile;$getUserVar[userProfile]]

    $let[i;0]
    $let[msgid;$messageID]

    $if[$env[userProfile;userPacks;$get[skinpack]];
      ${genMenu()}
      $interactionReply[
          $ephemeral 
          $description[## You already own it!]
          $getGlobalVar[author]
          $color[$getGlobalVar[defaultColor]]
      ]
      $stop
    ]
    $if[$env[userProfile;MC]<$get[cost];
      ${genMenu()}
      $interactionReply[
        $ephemeral 
        $description[## You don't have enough $getGlobalVar[emoji]!]
        $getGlobalVar[author]
        $color[$getGlobalVar[defaultColor]]
      ]
      $stop
    ]

    $callFunction[subMC;$get[cost]]

    $!jsonSet[userProfile;userPacks;$get[skinpack];true]
    $setUserVar[userProfile;$env[userProfile]]

    $interactionReply[
      $ephemeral
      $getGlobalVar[author]
      $description[## Successfully purchased!]
      $color[$getGlobalVar[defaultColor]]
    ]

    ${genMenu()}
  `
}]


function embedShop() {
    return `
        $getGlobalVar[author]
        $title[__Available Skinpacks__]
        $footer[Cash: $separateNumber[$env[userProfile;MC];,];https://media.discordapp.net/attachments/701793335941136464/1369682764470681683/Mopecoin.png]
        $color[$getGlobalVar[defaultColor]]
    `
}

function shop() {
    return `
        $jsonLoad[allSkinPacks;$getGlobalVar[shopItems]]
    `
}

function genMenu () {
    return `
        ${menu()}

        $arrayForEach[allSkinPacks;pack;

            $if[$env[userProfile;userPacks;$env[pack;name]];;
                $letSum[i;1]
                $addOption[$env[pack;description];$separateNumber[$env[pack;cost];,];$env[pack;name]+$env[pack;cost]-$authorID;$getGlobalVar[emoji]]
            ]
        ]

        $if[$get[i]==0;
            $deleteComponent[shop-$authorID]
            $description[# The shop is empty]
        ;
            ${timeout()}
        ]

        $!editMessage[$channelID;$get[msgid];${embedShop()}]
    `
}

function menu(disabled = false) {
    return `
        $addActionRow
        $addStringSelectMenu[shop-$authorID;Choose a Skinpack!;${disabled}]
    `
}

function timeout() {
    return `
        $setTimeout[
            ${menu(true)}
            $addOption[.;;.]
            $!editMessage[$channelID;$get[msgid];${embedShop()}$color[GRAY] This message is now inactive]
        ;1m;SHOP-$authorID]
    `
}