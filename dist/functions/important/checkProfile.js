"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "checkProfile",
    description: "Checks the user's profile for specific conditions.",
    code: `
    $if[$env[userProfile;devMode]==0;
      $onlyIf[$getGlobalVar[botEnabled]]
    ]
    $onlyIf[$env[userProfile;isBanned]!=true]
    $onlyIf[$env[userProfile;acceptedRules];$robotCheck]
    $onlyIf[$env[userProfile;onSlowmode]!=true]    
  `
};
//# sourceMappingURL=checkProfile.js.map