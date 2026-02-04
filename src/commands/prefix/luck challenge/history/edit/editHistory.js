export default {
  name: 'edithistory',
  aliases: ['editHis', 'eh', 'ehis'],
  type: 'messageCreate',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown[1m]

    $jsonLoad[history;$getUserVar[challengeHistory]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.$commandName.welcomeTitle]]
      $addActionRow
      $addStringSelectMenu[editHistoryOptions-$authorID;$tl[ui.$commandName.menuTitleEditHistoryOptions]]
      $addOption[$tl[ui.$commandName.optionNameAddPage];;addNewHistoryPage]
      $addOption[$tl[ui.$commandName.optionNameEditPage];;editExistingHistoryPage]
    ;$getGlobalVar[luckyColor]]

    $newTimeout[edit_history-$authorID;1m;$sendMessage[$channelID;;true]]
  `
}