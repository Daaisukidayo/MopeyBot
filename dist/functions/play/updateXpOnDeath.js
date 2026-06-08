"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'updateXpOnDeath',
    code: `
    $if[$env[playData]==;$return]
    $jsonLoad[apexData;$getCurrentApexData]
    $if[$and[$env[playData;tier]==17;$env[apexData;hasAllApex]];
      $!jsonSet[playData;XP;0]
    ;
      $!jsonSet[playData;XP;$floor[$math[$env[playData;XP] / $random[1.5;2.15;true]]]]
    ]
  `
};
//# sourceMappingURL=updateXpOnDeath.js.map