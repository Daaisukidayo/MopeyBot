export default {
  type: "clientReady",
  code: `
    $logger[Info;Bot $username[$botID] is ready]

    $loop[-1;
      $if[$getGlobalVar[botEnabled];
        $setStatus[Idle;Watching;$guildCount servers!]
      ;
        $setStatus[Idle;Custom;Disabled for maintenance]
      ]
      $wait[15s]
    ]
  `
}