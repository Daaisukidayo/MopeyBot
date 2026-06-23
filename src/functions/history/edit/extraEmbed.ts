export default {
  name: "editHistoryExtraEmbed",
  code: `
    $let[l;$env[userProfile;language]]
    $let[cachedIndex;$getMessageVar[cachedHistoryPageIndex;$messageID]]
    $if[$get[cachedIndex]==;
      $let[cachedIndex;$arrayFindIndex[history;data;$env[data;id]==$env[thisHistory;id]]]
      $setMessageVar[cachedHistoryPageIndex;$get[cachedIndex];$messageID]
    ]

    $addContainer[
      $addActionRow
      $addStringSelectMenu[editHistory-selectEditOption-$authorID;$tl[ui.history.menuTitleChooseOptions.$get[l]]]
      $addOption[$tl[ui.history.optionNamePoints.$get[l]];;points]
      $addOption[$tl[ui.history.optionNameRares.$get[l]];;raresQuantity]
      $addOption[$tl[ui.history.optionNamePlayType.$get[l]];;playType]
      $addOption[$tl[ui.history.optionNameDifficulty.$get[l]];;difficulty]
      $addOption[$tl[ui.history.optionNameEndDate.$get[l]];;endDate]
      $addOption[$tl[ui.history.optionNameRaresList.$get[l]];;raresList]
      
      $addActionRow
      $addButton[showHistory-saveEditChanges-$authorID;$tl[ui.history.buttonLabelSaveChanges.$get[l]];Success;;$checkCondition[$jsonStringify[$env[thisHistory]]==$jsonStringify[$env[history;$get[cachedIndex]]]]]
      $addButton[editHistory-resetEditChanges-$authorID;$tl[ui.history.buttonLabelResetChanges.$get[l]];Secondary]
      $addButton[showHistory-cancelEditChanges-$authorID;$tl[ui.history.buttonLabelCancelChanges.$get[l]];Danger]
    ;$getGlobalVar[luckyColor]]
  `
}