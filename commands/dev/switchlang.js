module.exports = [{
  name: "switchlang",
  aliases: ["sl"],
  type: "messageCreate",
  code: `
    $reply
    $onlyForUsers[;$botOwnerID]

    $if[$getUserVar[l10n]==EN; 
        $setUserVar[l10n;RU] ## Switched your localization to \`$getUserVar[l10n]\`!
    ;
        $setUserVar[l10n;EN] ## Switched your localization to \`$getUserVar[l10n]\`!
    ]
  `
}];
