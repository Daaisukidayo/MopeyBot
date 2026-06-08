"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    type: 'interactionCreate',
    allowedInteractionTypes: ['button'],
    code: `
    $arrayLoad[IID;-;$customID]
    $onlyIf[$arrayIncludes[IID;notARobot]]
    $jsonLoad[userProfile;$getProfile]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $jsonLoad[allLocales;$getGlobalVar[allLocales]]
    $arrayMap[allLocales;locale;
      $return[$env[locale;name]]
    ;localeNames]
      
    $let[locale;$locale]

    $let[langIndex;$function[$scope[
      $let[i;$arrayFindIndex[localeNames;locale;$env[locale]==$get[locale]]]
      $if[$get[i]==-1;
        $let[i;0]
      ]
      $return[$get[i]]
    ]]]

    $!jsonSet[userProfile;language;$get[langIndex]]
    $!jsonSet[userProfile;ID;"$authorID"]
    $saveProfile
    $rulesEmbed
    $interactionUpdate
  `
};
//# sourceMappingURL=rulesInteraction.js.map