export default {
  type: 'clientReady',
  code: `
    $loop[-1;
      $jsonLoad[ids;$getGlobalVar[allUserIDs]]
      $jsonLoad[data;{}]
      $arrayForEach[ids;id;
        $jsonSet[data;$env[id];$username[$env[id]]]
      ]
      $setGlobalVar[usernames;$env[data]]
      $wait[10m]
    ]
  `
}