const CD = "1m"

module.exports = [{
  name: "raretrymode",
  aliases: ["rtm", "rtmode"],
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
    $callFunction[cooldown;${CD}]

    $if[$message!=;
      $let[arg;"$toLowerCase[$message[0]]"]

      $if[$includes[$get[arg];"inferno";"inf";1];         $!jsonSet[userProfile;rtMode;inferno]
      ;$if[$includes[$get[arg];"default";"def";2];        $!jsonSet[userProfile;rtMode;default]
      ;$if[$includes[$get[arg];"medium";"med";3];         $!jsonSet[userProfile;rtMode;medium]
      ;$if[$includes[$get[arg];"hard";4];                 $!jsonSet[userProfile;rtMode;hard]
      ;$if[$includes[$get[arg];"insane";"ins";5];         $!jsonSet[userProfile;rtMode;insane]
      ;$if[$includes[$get[arg];"impossible";"imp";6];     $!jsonSet[userProfile;rtMode;impossible]
      ]]]]]]
    ]

    ${jsonAndArray()}
    ${embed()}
    ${buttonsLoop()}
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
    ${jsonAndArray()}
    $onlyIf[$arrayIncludes[interactionID;rtMode]]
    $onlyIf[$arraySome[raretryModes;mode;$arrayIncludes[interactionID;$toLowercase[$env[mode]]]]]
    $onlyIf[$arrayIncludes[interactionID;$authorID];$callFunction[notYourBTN]]
    
    $!jsonSet[userProfile;rtMode;$env[interactionID;0]]
    $setUserVar[userProfile;$env[userProfile]]
    $let[msgid;$messageID]

    ${embed()}
    ${buttonsLoop()}
    $interactionUpdate

    $!clearTimeout[RTM-$authorID]
    ${timeout()}
  `
}]

function jsonAndArray() {
  return `
    $jsonLoad[raretryVarData;$getGlobalVar[raretryVarData]]
    $jsonLoad[raretryModes;$env[raretryVarData;raretryModes]]
  `
}

function embed() {
  return `
    $callFunction[embed;lucky]
    $description[# Choose your raretry mode:]
  `
}

function buttonsLoop(){
  return `
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