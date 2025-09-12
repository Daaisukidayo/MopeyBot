import settingsSnippets from "#snippets/settingsSnippets.js"
import universalSnippets from "#snippets/universalSnippets.js"

export default {
  type: "interactionCreate",
  allowedInteractionTypes: ["button"],
  code: `
    $arrayLoad[IID;-;$customID]
    $let[value;$env[IID;0]]
    ${universalSnippets.loadProfile()}
    $jsonLoad[userSettings;$env[userProfile;1hl;settings]]
    ${settingsSnippets.settingsLoadGJSON()}

    $onlyIf[$arrayIncludes[IID;settings]]
    $let[hasSettKey;$arraySome[allSettingsEntries;entry;$jsonLoad[arr;$env[entry]] $return[$arrayIncludes[IID;$env[arr;0]]]]]
    $let[hasDiffKey;$arraySome[difficulties;elem;$arrayIncludes[IID;$env[elem]]]]
    $onlyIf[$or[$get[hasSettKey];$get[hasDiffKey]]]
    $onlyIf[$arrayIncludes[IID;$authorID];$callFunction[notYourBTN]]

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

    ${settingsSnippets.settingsEmbed()}
    $let[msg;$messageID]
    $interactionUpdate
    ${settingsSnippets.settingsTimeout()}
  `
}