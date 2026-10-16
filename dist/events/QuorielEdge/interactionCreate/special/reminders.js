"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const edge_1 = require("@quoriel/edge");
exports.default = new edge_1.Command({
    name: "reminders",
    type: "interactionCreate",
    allowed: ["button"],
    code: `
    $arrayLoad[IID;-;$customID]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $jsonLoad[userReminders;$getUserVar[userReminders]]
    $toggleArrayValue[userReminders;$jsonGet[IID;1]]

    $setUserVar[userReminders;$env[userReminders]]

    $remindersEmbed
    $interactionUpdate
    $newCommandTimeout[reminders]
  `,
});
//# sourceMappingURL=reminders.js.map