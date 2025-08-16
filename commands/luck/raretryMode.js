const CD = "1m"

export default [{
  name: "raretrymode",
  aliases: ["rtm", "rtmode"],
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
    $callFunction[cooldown;${CD}]

    $if[$message!=;
      $let[arg;$toLowerCase[$message[0]]]

      $jsonLoad[allowedArgs;[
        ["default", "def", "1"\\],
        ["medium", "med", "2"\\],
        ["hard", "3"\\],
        ["insane", "ins", "4"\\],
        ["impossible", "imp", "5"\\]
      \\]]

      $arrayForEach[allowedArgs;args;
        $if[$arrayIncludes[args;$get[arg]]; 
          $!jsonSet[userProfile;rtMode;$env[args;0]]
        ]
      ]
    ]

    ${JSON()}
    ${embed()}
    $let[msgid;$sendMessage[$channelID;;true]]
    $setUserVar[userProfile;$env[userProfile]]

    ${timeout()}
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: [ "button" ],
  code: `
    $arrayLoad[interactionID;-;$customID]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $onlyIf[$arrayIncludes[interactionID;rtMode]]
    ${JSON()}
    $onlyIf[$arraySome[raretryModes;mode;$arrayIncludes[interactionID;$toLowercase[$env[mode]]]]]
    $onlyIf[$arrayIncludes[interactionID;$authorID];$callFunction[notYourBTN]]
    
    $!jsonSet[userProfile;rtMode;$env[interactionID;0]]
    $setUserVar[userProfile;$env[userProfile]]
    $let[msgid;$messageID]

    ${embed()}
    $interactionUpdate

    $!clearTimeout[RTM-$authorID]
    ${timeout()}
  `
}]

function JSON() {
  return `
    $jsonLoad[raretryVarData;$getGlobalVar[raretryVarData]]
    $jsonLoad[raretryModes;$env[raretryVarData;raretryModes]]
  `
}

function embed() {
  return `
    $callFunction[embed;lucky]
    $description[# Choose your raretry mode:]
    $loop[$arrayLength[raretryModes];
      $let[i;$math[$env[i] - 1]]
      $let[mode;$arrayAt[raretryModes;$get[i]]]
      $if[$math[$get[i] % 3]==0;
        $addActionRow
      ]

      $addButton[$toLowerCase[$get[mode]]-rtMode-$authorID;$get[mode];Success;;$checkCondition[$env[userProfile;rtMode]==$toLowerCase[$get[mode]]]]
    ;i;true]
  `
}


function timeout() {
  return `
    $setTimeout[ 
      $!disableButtonsOf[$channelID;$get[msgid]]
    ;${CD};RTM-$authorID]
  `
}