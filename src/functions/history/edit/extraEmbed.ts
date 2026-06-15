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
      $addStringSelectMenu[editHistory-selectEditOption-$authorID;$tl[$get[l];ui;history.menuTitleChooseOptions]]
      $addOption[$tl[$get[l];ui;history.optionNamePoints];;points]
      $addOption[$tl[$get[l];ui;history.optionNameRares];;raresQuantity]
      $addOption[$tl[$get[l];ui;history.optionNamePlayType];;playType]
      $addOption[$tl[$get[l];ui;history.optionNameDifficulty];;difficulty]
      $addOption[$tl[$get[l];ui;history.optionNameEndDate];;endDate]
      $addOption[$tl[$get[l];ui;history.optionNameRaresList];;raresList]
      
      $addActionRow
      $addButton[showHistory-saveEditChanges-$authorID;$tl[$get[l];ui;history.buttonLabelSaveChanges];Success;;$checkCondition[$jsonStringify[$env[thisHistory]]==$jsonStringify[$env[history;$get[cachedIndex]]]]]
      $addButton[editHistory-resetEditChanges-$authorID;$tl[$get[l];ui;history.buttonLabelResetChanges];Secondary]
      $addButton[showHistory-cancelEditChanges-$authorID;$tl[$get[l];ui;history.buttonLabelCancelChanges];Danger]
    ;$getGlobalVar[luckyColor]]
  `
}