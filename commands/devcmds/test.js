module.exports = [{
  name: 'test',
  type: 'messageCreate',
  code: `
    $reply
    $onlyForUsers[;$botOwnerID]
  `
}]