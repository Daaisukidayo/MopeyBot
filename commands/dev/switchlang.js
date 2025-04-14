module.exports = [{
  name: "switchlang",
  type: "messageCreate",
  code: `
    $reply
    $if[$getUserVar[l10n]==EN; 
        $setUserVar[l10n;RU] ## Switched your localization language to \`$getUserVar[l10n]\`!
    ;
        $setUserVar[l10n;EN] ## Switched your localization language to \`$getUserVar[l10n]\`!
    ]
  `
}];
