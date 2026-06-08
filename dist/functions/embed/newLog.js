"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'newLog',
    params: [
        {
            name: '_description',
            required: true
        }
    ],
    code: `
    $addContainer[
      $addTextDisplay[# 📄 NEW LOG!]
      $addSeparator[Large]
      $addTextDisplay[## > _$trim[$env[_description]]_]
    ;$getGlobalVar[logColor]]
    $sendMessage[$getGlobalVar[logChannelID]]
  `
};
//# sourceMappingURL=newLog.js.map