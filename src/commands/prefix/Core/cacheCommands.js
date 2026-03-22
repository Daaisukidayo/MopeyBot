export default {
  type: 'clientReady',
  code: `
    $jsonLoad[commands;$readFile[src/json/commandsData.json]]
    $jsonLoad[data;{}]
    
    $arrayForEach[commands;command;
      $let[name;$env[command;commandAliases;0]]
      $jsonSet[data;$get[name];"$applicationCommandID[$get[name]]"]
    ]

    $setGlobalVar[slashCommandsData;$env[data]]
    $logger[Info;Cached «slashCommandsData»]
  `
}