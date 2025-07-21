module.exports = [{
  name: "switchlang",
  aliases: ["sl"],
  type: "messageCreate",
  code: `
    $reply
    $onlyForUsers[;$botOwnerID]

    $jsonLoad[lang;
      {
        "EN": "English",
        "RU": "Russian"
      }
    ]

    $if[$getUserVar[l10n]==EN; 
        $setUserVar[l10n;RU] ## Switched your localization to \`$env[lang;RU]\`!
    ;
        $setUserVar[l10n;EN] ## Switched your localization to \`$env[lang;EN]\`!
    ]
  `
}];
