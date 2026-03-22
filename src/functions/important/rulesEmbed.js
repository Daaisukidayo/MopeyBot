export default {
  name: "rulesEmbed",
  description: "Adds a rules embed.",
  code: `
    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.rules.notAccepted]]
      $addTextDisplay[$tl[ui.rules.description]]
      $addSeparator
      $addTextDisplay[$tl[ui.rules.information;$getGlobalVar[informationLink]]]
      $addTextDisplay[$tl[ui.rules.tos;$getGlobalVar[tosLink]]]
      $addTextDisplay[$tl[ui.rules.rules;$getGlobalVar[rulesLink]]]
      $addSeparator
      $addActionRow
      $addButton[acceptrules-$authorID;$tl[ui.rules.buttonLabelAccept];Success;✅]
      $addButton[declinerules-$authorID;$tl[ui.rules.buttonLabelDecline];Danger;🛑]
    ;$getGlobalVar[cooldownColor]]

  `
}