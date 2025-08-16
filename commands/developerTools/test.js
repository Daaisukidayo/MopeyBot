export default {
  name: 'test',
  type: 'messageCreate',
  code: `
    $reply
    $onlyForUsers[;$botOwnerID]
  `
}