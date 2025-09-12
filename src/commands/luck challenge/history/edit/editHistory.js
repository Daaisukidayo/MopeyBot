import universalSnippets from "#snippets/universalSnippets.js"

export default {
  name: 'editHistory',
  aliases: ['editHis', 'eh', 'ehis'],
  type: 'messageCreate',
  code: `
    $reply
    ${universalSnippets.checkProfile({time: '1m'})}
    $jsonLoad[history;$env[userProfile;1hl;history]]

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]
      $addTextDisplay[## Welcome to the history editor!]
      $addActionRow
      $addStringSelectMenu[editHistoryOptions-$authorID;Choose an option]
      $addOption[Add new page;;addNewHistoryPage]
      $addOption[Edit existing page;;editExistingHistoryPage]
    ;$getGlobalVar[luckyColor]]
  `
}