export default {
  name: 'handleEdithistory',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown

    $defer

    $jsonLoad[history;$getUserVar[challengeHistory]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.edithistory.welcomeTitle]]
      $addActionRow
      $addStringSelectMenu[editHistoryOptions-$authorID;$tl[ui.edithistory.menuTitleEditHistoryOptions]]
      $addOption[$tl[ui.edithistory.optionNameAddPage];;addNewHistoryPage]
      $addOption[$tl[ui.edithistory.optionNameEditPage];;editExistingHistoryPage]
    ;$getGlobalVar[luckyColor]]

    $newCommandTimeout
  `
}