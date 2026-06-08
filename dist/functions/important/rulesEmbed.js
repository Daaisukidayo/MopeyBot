"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "rulesEmbed",
    description: "Adds a rules embed.",
    code: `
    $let[l;$env[userProfile;language]]
    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[$get[l];ui;rules.notAccepted]]
      $addTextDisplay[$tl[$get[l];ui;rules.description]]
      $addSeparator
      $addTextDisplay[$tl[$get[l];ui;rules.information;$getGlobalVar[informationLink]]]
      $addTextDisplay[$tl[$get[l];ui;rules.tos;$getGlobalVar[tosLink]]]
      $addTextDisplay[$tl[$get[l];ui;rules.rules;$getGlobalVar[rulesLink]]]
      $addSeparator
      $addActionRow
      $addButton[acceptrules-$authorID;$tl[$get[l];ui;rules.buttonLabelAccept];Success;✅]
      $addButton[declinerules-$authorID;$tl[$get[l];ui;rules.buttonLabelDecline];Danger;🛑]
    ;$getGlobalVar[cooldownColor]]

  `
};
//# sourceMappingURL=rulesEmbed.js.map