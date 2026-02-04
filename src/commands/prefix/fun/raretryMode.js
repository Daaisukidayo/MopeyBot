export default [{
  name: "raretrymode",
  aliases: ["rtm", "rtmode"],
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown[$getGlobalVar[raretryModeTT]]

    $jsonLoad[raretryVarData;$getGlobalVar[raretryVarData]]
    $jsonLoad[modes;$env[raretryVarData;modes]]
    ${embed()}
    $let[msgid;$sendMessage[$channelID;;true]]

    $newTimeout[RTM-$authorID;$getGlobalVar[raretryModeTT];$get[msgid]]
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ["button"],
  code: `
    $arrayLoad[IID;-;$customID]
    $onlyIf[$arrayIncludes[IID;rtMode]]
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $jsonLoad[raretryVarData;$getGlobalVar[raretryVarData]]
    $jsonLoad[modes;$env[raretryVarData;modes]]

    $!jsonSet[userProfile;rtMode;$env[IID;0]]
    $saveProfile

    $let[msgid;$messageID]
    ${embed()}
    $interactionUpdate
    
    $newTimeout[RTM-$authorID;$getGlobalVar[raretryModeTT]]
  `
}]


function embed() {
  return `
    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.raretrymode.title]]

      $loop[$arrayLength[modes];
        $let[i;$math[$env[i] - 1]]
        $let[modeI;$arrayAt[modes;$get[i]]]
        $let[mode;$tl[data.raretryModes.$get[modeI]]]
        $if[$math[$get[i] % 3]==0;
          $addActionRow
        ]

        $addButton[$get[modeI]-rtMode-$authorID;$get[mode];Success;;$checkCondition[$env[userProfile;rtMode]==$get[modeI]]]
      ;i;true]
    ;$getGlobalVar[luckyColor]]
  `
}