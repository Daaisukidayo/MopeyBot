export default {
  name: "balance",
  aliases: ['bal', 'coins', 'cash', 'profile', 'prof', 'money', 'packs'],
  type: "messageCreate",
  code: ` 
    $handleBalance
  `
}