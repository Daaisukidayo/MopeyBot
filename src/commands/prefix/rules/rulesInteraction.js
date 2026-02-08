export default {
  type: 'interactionCreate',
  allowedInteractionTypes: ['button'],
  code: `
    $arrayLoad[IID;-;$customID]
    $onlyIf[$arrayIncludes[IID;notARobot]]
    $jsonLoad[funcCache;{ "locales": $getGlobalVar[allLocales] }]
    $jsonLoad[userProfile;$getProfile]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]


    $let[langIndex;$function[
      $jsonLoad[locales;$env[funcCache;locales]]
      $arrayMap[locales;locale;
        $return[$env[locale;name]]
      ;localeNames]
      
      $arrayLoad[l;-;$locale]
      $let[loc;$toUpperCase[$env[l;0]]]
    
      $let[i;$arrayFindIndex[localeNames;locale;$env[locale]==$get[loc]]]
      $if[$get[i]==-1;
        $let[i;0]
      ]
      $return[$get[i]]
    ]]

    $!jsonSet[userProfile;language;$get[langIndex]]
    $saveProfile
    $rulesEmbed
    $interactionUpdate
  `
}