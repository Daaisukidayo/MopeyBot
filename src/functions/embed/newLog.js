export default {
  name: 'newLog',
  params: [
    {
      name: 'description',
      required: true
    }
  ],
  code: `
    $addContainer[
      $addTextDisplay[# 📄 NEW LOG!]
      $addSeparator[Large]
      $addTextDisplay[## > _$trim[$env[description]]_]
    ;$getGlobalVar[logColor]]
    $sendMessage[$getGlobalVar[logChannelID]]
  `
}