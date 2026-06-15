export default {
  type: 'clientReady',
  code: `
    $loop[-1;
      $jsonLoad[data;{}]
      $arrayForEach[$getGlobalVar[allUserIDs];id;
        $jsonSet[data;$env[id];$username[$env[id]]]
      ]
      $setCache[usernames;$env[data]]
      $appendFile[logs/usernames/log.log;$js[\`[${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}\\]\`] Successfully cached «usernames»\n]
      $wait[10m]
    ]
  `
}