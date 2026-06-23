export default {
  name: "rulesEmbed",
  description: "Adds a rules embed.",
  code: `
    $let[l;$env[userProfile;language]]
    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.rules.notAccepted.$get[l]]]
      $addTextDisplay[$tl[ui.rules.description.$get[l]]]
      $addSeparator
      $addTextDisplay[$tl[ui.rules.information.$get[l];$getGlobalVar[informationLink]]]
      $addTextDisplay[$tl[ui.rules.tos.$get[l];$getGlobalVar[tosLink]]]
      $addTextDisplay[$tl[ui.rules.privacyPolicy.$get[l];$getGlobalVar[privacyLink]]]
      $addTextDisplay[$tl[ui.rules.usage.$get[l];$getGlobalVar[usageLink]]]
      $addSeparator
      $addActionRow
      $addButton[acceptrules-$authorID;$tl[ui.rules.buttonLabelAccept.$get[l]];Success;✅]
      $addButton[declinerules-$authorID;$tl[ui.rules.buttonLabelDecline.$get[l]];Danger;🛑]
    ;$getGlobalVar[cooldownColor]]
  `
}