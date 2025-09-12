import universalSnippets from '#snippets/universalSnippets.js'

export default [{
  name: "shop",
  type: "messageCreate",
  code: `
    $reply
    ${loadJSON()}
    ${universalSnippets.checkProfile({time: CDTime()})}

    ${embed()}
    $let[msgid;$sendMessage[$channelID;;true]]
    ${timeout()}
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["selectMenu"],
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[values;-;$selectMenuValues]

    $onlyIf[$arrayIncludes[IID;purchasingSkinpacks]]
    ${loadJSON()}
    $onlyIf[$arrayIncludes[IID;$authorID];$callFunction[notYourBTN]]

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

    
    $callFunction[subMC;$get[cost]]
    $arrayPush[userPacks;$get[skinpack]]
    $!jsonSet[userProfile;userPacks;$env[userPacks]]
    $setUserVar[userProfile;$env[userProfile]]

    ${embed()}
    $interactionUpdate
    ${timeout()}

    $interactionFollowUp[
      $ephemeral
      $callFunction[embed;default]
      $description[## Successfully purchased «\`$get[skinpackName]\`»!]
    ]
  `
}]

function embed() {
  return `
    $addContainer[
      $callFunction[newAuthor]
      $addSeparator
      $addTextDisplay[# __Available Skin Packs__]

      $if[$arrayLength[userPacks]==$arrayLength[shopItems];
        $addTextDisplay[# The shop is empty]
      ;
        $addActionRow
        $addStringSelectMenu[purchasingSkinpacks-$authorID;Choose a Skinpack]

        $loop[$arrayLength[shopItems];
          $let[i;$math[$env[i] - 1]]
          $let[code;$env[shopItems;$get[i];code]]

          $if[$arrayIncludes[userPacks;$get[code]];$continue]

          $let[cost;$env[shopItems;$get[i];cost]]
          $let[optionName;$env[shopItems;$get[i];name]]
          $let[optionDesc;$separateNumber[$get[cost];,]]
          $let[optionValue;$get[code]-$get[cost]]

          $addOption[$get[optionName];$get[optionDesc];$get[optionValue];$getGlobalVar[emoji]]
        ;i;true]
      ]
      $addSeparator
      $addTextDisplay[-# Cash: $separateNumber[$env[userProfile;MC];,]$getGlobalVar[emoji]]
    ;$getGlobalVar[defaultColor]]
  `
}

function loadJSON() {
  return `
    $if[$env[userProfile]==;${universalSnippets.loadProfile()}]
    $jsonLoad[userPacks;$env[userProfile;userPacks]]
    $jsonLoad[shopItems;$getGlobalVar[shopItems]]
  `
}

function CDTime() { return `1m` }
function TOName() { return `SHOP-$authorID` }

function timeout() {
  return `
    $!stopTimeout[${TOName()}]
    $setTimeout[
      $!deleteMessage[$channelID;$get[msgid]]
    ;${CDTime()};${TOName()}]
  `
}