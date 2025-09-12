import universalSnippets from "#snippets/universalSnippets.js"

const CD = "1m"

export default [{
  name: "raretrymode",
  aliases: ["rtm", "rtmode"],
  type: "messageCreate",
  code: `
    $reply
    ${universalSnippets.checkProfile({time: CD})}

    $if[$message!=;
      $let[arg;$toLowerCase[$message[0]]]

      $jsonLoad[allowedArgs;${allowedArgs()}]

      $arrayForEach[allowedArgs;args;
        $if[$arrayIncludes[args;$get[arg]]; 
          $!jsonSet[userProfile;rtMode;$env[args;0]]
        ]
      ]
    ]

    ${loadJSON()}
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
    ${loadJSON()}
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

function allowedArgs() {
  return JSON.stringify([
    ["default", "def", "1"],
    ["medium", "med", "2"],
    ["hard", "3"],
    ["insane", "ins", "4"],
    ["impossible", "imp", "5"]
  ]).replace(/]/g, '\\]')
}

function loadJSON() {
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