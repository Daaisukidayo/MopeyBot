"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    type: 'clientReady',
    code: `
    $loop[-1;
      $jsonLoad[ids;$getGlobalVar[allUserIDs]]
      $jsonLoad[data;{}]
      $arrayForEach[ids;id;
        $jsonSet[data;$env[id];$username[$env[id]]]
      ]
      $setCache[usernames;$env[data]]
      $appendFile[logs/usernames/log.log;$js[\`[${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}\\]\`] Successfully cached «usernames»\n]
      $wait[10m]
    ]
  `
};
//# sourceMappingURL=cacheUsernames.js.map