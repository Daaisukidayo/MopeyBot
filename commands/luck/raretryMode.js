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
    $arrayLoad[btn;-;$selectMenuValues]
    $onlyIf[$includes[$env[btn;0];inferno;default;medium;hard;insane;impossible]]
    $onlyIf[$includes[$env[btn;1];$authorID];$callFunction[notYourBTN]]

    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $!jsonSet[userProfile;rtMode;$env[btn;0]]
    $setUserVar[userProfile;$env[userProfile]]
    $let[msgid;$messageID]

    ${jsonAndArray()}
    ${buttonsLoop()}
    $!editMessage[$channelID;$get[msgid];${embed()}]

    $deferUpdate

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
    $getGlobalVar[author]
    $description[# Choose your raretry mode:]
    $color[228b22]
`
}

function buttonsLoop(){
  return `
    $let[q;0]
    $arrayForEach[raretryModes;mode;
      $if[$math[$get[q] % 3]==0;
        $addActionRow
      ]

      $let[dis;$checkCondition[$env[userProfile;rtMode]==$toLowerCase[$env[mode]]]]

      $addButton[$toLowerCase[$env[mode]]-$authorID;$env[mode];Success;;$get[dis]]
      $letSum[q;1]
    ;i;desc]
  `
}

function timeout() {
  return `
    $setTimeout[ 
      $!disableButtonsOf[$channelID;$get[msgid]]
    ;${CD};RTM-$authorID]
  `
}