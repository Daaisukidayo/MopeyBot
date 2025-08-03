module.exports = [{
  name: "switchlang",
  aliases: ["sl"],
  type: "messageCreate",
  code: `
    $reply
    $onlyForUsers[;$botOwnerID]
    $jsonLoad[userProfile;$getUserVar[userProfile]]

    $jsonLoad[lang;
      {
        "EN": "English",
        "RU": "Русский"
      }
    ]
    $jsonLoad[langKeys;$jsonKeys[lang]]
    $let[arg;$toUpperCase[$message]]

    $onlyIf[$arrayIncludes[langKeys;$get[arg]];
      $callFunction[embed;error]
      $description[## Unknown language!]
    ]

    $if[$env[userProfile;language]==EN;
      $let[desc;Язык бота был изменен на \`$env[lang;RU]\`!]
    ;
      $let[desc;Switched Bot's language to \`$env[lang;EN]\`!]
    ]

    $callFunction[embed;default]
    $description[## $get[desc]]
    $!jsonSet[userProfile;l10n;$get[arg]]
    $setUserVar[userProfile;$env[userProfile]]
  `
}];
