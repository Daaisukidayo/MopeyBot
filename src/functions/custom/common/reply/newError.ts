import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "newError",
  description: "Sends a V2 message with the specified error message.",
  params: [
    {
      name: "description",
      description: "The error description to display in the embed.",
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
