export default {
  name: "rulesEmbed",
  description: "Adds a rules embed.",
  params: [
    {
      name: "disable_buttons",
      type: "Boolean",
      required: false,
    }
  ],
  brackets: false,
  code: `
    $let[d;$nullish[$env[disable_buttons];false]]
    $author[$tl[ui.rules.greeting;$userDisplayName];$userAvatar]
    $title[$tl[ui.rules.notAccepted]]
    $description[
      $tl[ui.rules.description]
      # $hyperlink[$tl[ui.rules.information];https://github.com/Daaisukidayo/MopeyBot/blob/main/README.md]
      # $hyperlink[$tl[ui.rules.tos];https://github.com/Daaisukidayo/MopeyBot/blob/main/Mopey's_TOS.md]
      # $hyperlink[$tl[ui.rules.privacyPolicy];https://github.com/Daaisukidayo/MopeyBot/blob/main/Mopey's_TOS.md#-privacy-policy]
      # $hyperlink[$tl[ui.rules.rules];https://github.com/Daaisukidayo/MopeyBot/blob/main/Rules.md]
    ]
    $color[$getGlobalVar[cooldownColor]]

    $addActionRow
    $addButton[acceptrules-$authorID;$tl[ui.rules.buttonLabelAccept];Success;✅;$get[d]]
    $addButton[declinerules-$authorID;$tl[ui.rules.buttonLabelDecline];Danger;🛑;$get[d]]
  `
}