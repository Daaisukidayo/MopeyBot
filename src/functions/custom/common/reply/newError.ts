import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "newError",
  description: "sends a V2 error msg",
  params: [
    {
      name: "description",
      description: "the error text",
      type: ArgType.String,
    },
  ],
  code: `
    $let[l;$jsonGet[userProfile;language]]
    $ephemeral
    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[# ✖️ $tl[ui.errors.errorTitle.$get[l]]]
      $addSeparator[Small;false]
      $addTextDisplay[## > $trim[$env[description]]]
    ;$getGlobalVar[errorColor]]
    $!send
    $stop
  `,
})
