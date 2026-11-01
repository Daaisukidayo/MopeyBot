"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "newError",
    description: "sends a V2 error msg",
    params: [
        {
            name: "description",
            description: "the error text",
            type: forgescript_1.ArgType.String,
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
});
//# sourceMappingURL=newError.js.map