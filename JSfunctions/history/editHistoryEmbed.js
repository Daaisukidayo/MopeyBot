export default function editHistoryEmbed() {
  return `
    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]
      $addTextDisplay[## Choose what you want to edit!]
      $addSeparator
      $addActionRow
      $addStringSelectMenu[$get[page]-$get[sortType]-historyChooseEdit-$authorID;Choose an option]
      $addOption[Points;;points]
      $addOption[Rares;;raresQuantity]
      $addOption[Play Type;;playType]
      $addOption[Difficulty;;difficulty]
      $addOption[Ended at;;endedAt]
      $addOption[Tags;;tags]
      $addOption[Rares List;;raresList]
    ;$getGlobalVar[luckyColor]]
  `
}
