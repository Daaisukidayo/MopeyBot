export default {
  name: 'test',
  type: 'messageCreate',
  code: `
    $reply
    $onlyForUsers[;$botOwnerID]
    $eval[$callFunction[loadNumbers];false]
    -> $env[nums] <-
  `
}