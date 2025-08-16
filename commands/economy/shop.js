const CD = "1m"

export default [{
  name: "shop",
  type: "messageCreate",
  code: `
    $reply
    ${json()}
    $callFunction[checking]
    $callFunction[cooldown;${CD}]

    ${embedShop()}
    $let[msgid;$sendMessage[$channelID;;true]]
    ${timeout()}
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["selectMenu"],
  code: `
    $arrayLoad[interIDs;-;$customID]
    $arrayLoad[values;-;$selectMenuValues]
    
    ${json()}

    $onlyIf[$arrayIncludes[interIDs;purchasingSkinpacks]]
    $onlyIf[$arrayIncludes[interIDs;$authorID];$callFunction[notYourBTN]]

    $let[skinpack;$env[values;0]]
    $let[cost;$env[values;1]]
    $let[msgid;$messageID]
    $let[itemIndex;$arrayFindIndex[shopItems;item;$env[item;code]==$get[skinpack]]]
    $let[skinpackName;$env[shopItems;$get[itemIndex];name]]

    $onlyIf[$get[itemIndex]!=-1;
      $interactionReply[
        $ephemeral 
        $description[## Unknown Skin Pack]
        $callFunction[embed;error]
      ]
      $stop
    ]

    $if[$arrayIncludes[userPacks;$get[skinpack]];
      $interactionReply[
        $ephemeral 
        $description[## You already purchased it!]
        $callFunction[embed;error]
      ]
      $stop
    ]
    $if[$env[userProfile;MC]<$get[cost];
      $interactionReply[
        $ephemeral 
        $description[## You don't have enough $getGlobalVar[emoji]!]
        $callFunction[embed;error]
      ]
      $stop
    ]

    $!stopTimeout[SHOP-$authorID]
    $callFunction[subMC;$get[cost]]
    $arrayPush[userPacks;$get[skinpack]]
    $!jsonSet[userProfile;userPacks;$env[userPacks]]
    $setUserVar[userProfile;$env[userProfile]]

    ${embedShop()}
    $interactionUpdate
    ${timeout()}

    $interactionFollowUp[
      $ephemeral
      $callFunction[embed;default]
      $description[## Successfully purchased «\`$get[skinpackName]\`»!]
    ]
  `
}]


function embedShop() {
  return `
    $addContainer[
      $callFunction[newAuthor]
      $addSeparator
      $addTextDisplay[# __Available Skin Packs__]
      ${genMenu()}
      $addSeparator
      $addTextDisplay[-# Cash: $separateNumber[$env[userProfile;MC];,]$getGlobalVar[emoji]]
    ;$getGlobalVar[defaultColor]]
    `
}

function json() {
  return `
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $jsonLoad[userPacks;$env[userProfile;userPacks]]
    $jsonLoad[shopItems;$getGlobalVar[shopItems]]
  `
}

function genMenu () {
  return `
    $if[$arrayLength[userPacks]==$arrayLength[shopItems];
      $description[# The shop is empty]
    ;
      $addActionRow
      $addStringSelectMenu[purchasingSkinpacks-$authorID;Choose a Skinpack]

      $loop[$arrayLength[shopItems];
        $let[i;$math[$env[i] - 1]]
        $jsonLoad[skinpack;$arrayAt[shopItems;$get[i]]]
        $let[code;$env[skinpack;code]]

        $if[$arrayIncludes[userPacks;$get[code]];$continue]

        $let[cost;$env[skinpack;cost]]
        $let[optionName;$env[skinpack;name]]
        $let[optionDesc;$separateNumber[$get[cost];,]]
        $let[optionValue;$get[code]-$get[cost]]

        $addOption[$get[optionName];$get[optionDesc];$get[optionValue];$getGlobalVar[emoji]]
      ;i;true]
    ]
  `
}

function timeout() {
  return ``
  return `
    $setTimeout[
      $deleteComponentFrom[$channelID;$get[msgid];purchasingSkinpacks-$authorID]
    ;${CD};SHOP-$authorID]
  `
}