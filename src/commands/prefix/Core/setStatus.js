export default {
  type: "clientReady",
  code: `
    $logger[Info;Bot $username[$botID] is ready]

    $loop[-1;
      $if[$getGlobalVar[botEnabled];
        $if[$math[$env[i] % 2]==0;
          $setStatus[idle;Watching;$guildCount servers!]
        ;
          $setStatus[idle;Playing;$getGlobalVar[prefix]help]
        ]
      ;
        $setStatus[dnd;Custom;Disabled for maintenance]
      ]
      $wait[15s]
    ;i]
  `
}