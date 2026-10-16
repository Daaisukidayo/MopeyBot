"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "handleEnd",
    code: `
    $reply
    $jsonLoad[userProfile;$getProfile]

    $checkProfile
    $jsonLoad[challengeProgress;$getProgress]
    $isActiveChallenge[challengeProgress]

    $defer

    $addChallengeCompletedContainer[$jsonGet[challengeProgress;raresList]]
    $!send
    $finishChallenge[challengeProgress]
  `,
});
//# sourceMappingURL=end.js.map