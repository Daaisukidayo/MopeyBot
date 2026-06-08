"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    type: 'clientReady',
    code: `
    $c[
      $jsonLoad[commandsData;$readFile[res/data/commandsData.json]]
      $jsonLoad[commandEntries;$jsonEntries[commandsData]]
      $jsonLoad[data;{}]
      
      $arrayForEach[commandEntries;entry;
        $let[name;$env[entry;1;commandName]]
        $jsonSet[data;$get[name];"$applicationCommandID[$get[name]]"]
      ]

      $setCache[slashCommandsData;$env[data]]
      $logger[Info;Cached «slashCommandsData»]
    ]
  `
};
//# sourceMappingURL=cacheCommands.js.map