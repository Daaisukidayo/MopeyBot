module.exports = ({
  name: "ping",
  type: "messageCreate",
  code: `
    $reply
    
    $callFunction[checking;]

    $if[$getUserVar[l10n]==EN;  **Current bot ping: \`$ping\`ms**\n**Execution time: \`$floor[$executionTime]\`ms**  ;
    $if[$getUserVar[l10n]==RU;  **Текущая задержка бота: \`$ping\`мс**\n**Время выполнения: \`$floor[$executionTime]\`мс**  ]]
  `
})