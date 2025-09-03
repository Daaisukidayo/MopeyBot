import settingsEmbed from "../../../JSfunctions/settings/embed.js"
import settingsTimeout from "../../../JSfunctions/settings/timeout.js"
import loadGlobalJSON from "../../../JSfunctions/settings/loadGlobalVars.js"

export default {
  type: "interactionCreate",
  allowedInteractionTypes: ["button"],
  code: `
    $arrayLoad[IID;-;$customID]
    $let[value;$env[IID;0]]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $jsonLoad[userSettings;$env[userProfile;1hl;settings]]
    ${loadGlobalJSON()}

    $onlyIf[$arrayIncludes[IID;settings]]
    $let[hasSettKey;$arraySome[allSettingsEntries;entry;$jsonLoad[arr;$env[entry]] $return[$arrayIncludes[IID;$env[arr;0]]]]]
    $let[hasDiffKey;$arraySome[difficulties;elem;$arrayIncludes[IID;$env[elem]]]]
    $onlyIf[$or[$get[hasSettKey];$get[hasDiffKey]]]
    $onlyIf[$arrayIncludes[IID;$authorID];$callFunction[notYourBTN]]

    $!stopTimeout[SETT-$authorID]

    $if[$get[hasSettKey];

      $if[$arrayIncludes[userSettings;$get[value]];
        $!arraySplice[userSettings;$arrayIndexOf[userSettings;$get[value]];1]
      ;
        $arrayPush[userSettings;$get[value]]
      ]
      $!jsonSet[userProfile;1hl;settings;$env[userSettings]]

    ;
      $if[$get[hasDiffKey];
        $!jsonSet[userProfile;1hl;difficulty;$get[value]]
      ]
    ]

    $setUserVar[userProfile;$env[userProfile]]
    ${settingsEmbed()}
    $let[msg;$messageID]

    $interactionUpdate
    ${settingsTimeout()}
  `
}