export default {
  name: "notARobot",
  type: "interactionCreate",
  allowed: ['button'],
  code: `
    $arrayLoad[IID;-;$customID]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $jsonLoad[allLocales;$getGlobalVar[allLocales]]
      
    $let[locale;$locale]

    $if[$jsonHas[allLocales;$get[locale]];
      $!jsonSet[userProfile;language;$get[locale]]
    ;
      $!jsonSet[userProfile;language;en-US]
    ]

    $!jsonSet[userProfile;ID;"$authorID"]
    $saveProfile[$env[userProfile]]
    $rulesEmbed
    $interactionUpdate
  `
}