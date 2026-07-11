import { ArgType, ForgeFunction } from "@tryforge/forgescript";

export default new ForgeFunction({ 
  name: "newError",
  description: "Sends a V2 message with the specified error message.",
  params: [
    { 
      name: "_description", 
      description: "The error description to display in the embed.",
      type: ArgType.String,
    },
  ],
  code: `
    $let[l;$env[userProfile;language]]
    $ephemeral
    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[# ✖️ $tl[ui.errors.errorTitle.$get[l]]]
      $addSeparator[Small;false]
      $addTextDisplay[## > $trim[$env[_description]]]
    ;$getGlobalVar[errorColor]]
    $!send
    $stop
  `
})