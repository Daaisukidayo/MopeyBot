export default {
  type: 'interactionCreate',
  allowedInteractionTypes: ['button'],
  code: `
    $arrayLoad[IID;-;$customID]
    $onlyIf[$arrayIncludes[IID;notARobot]]
    $jsonLoad[funcCache;{}]
    $jsonLoad[userProfile;$getProfile]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]


    $let[langIndex;$function[
      $jsonLoad[locales;$getGlobalVar[allLocales]]
      $arrayMap[locales;locale;
        $return[$env[locale;name]]
      ;localeNames]
      
      $arrayLoad[l;-;$locale]
      $let[lang;$toUpperCase[$env[l;0]]]
    
      $let[i;$arrayFindIndex[localeNames;locale;$env[locale]==$get[lang]]]
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