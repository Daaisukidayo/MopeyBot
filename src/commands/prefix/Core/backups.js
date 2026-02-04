export default {
  type: "clientReady",
  code: `
    $if[$getGlobalVar[makeBackups]; $c[BACKUPS]
      $setInterval[
        $jsonLoad[allUserIDs;$getGlobalVar[allUserIDs]]

        $let[logCount;$getGlobalVar[backupLogCount]]
        $letSum[logCount;1]
        $setGlobalVar[backupLogCount;$get[logCount]]

        $let[logText;]
        $let[path;logs/backups/backup$get[logCount].log]

        $writeFile[$get[path];BACKUP LOGS №$get[logCount]]
        
        $arrayForEach[allUserIDs;ID;
          $jsonLoad[userProfile;$getUserVar[userProfile;$env[ID]]]
          $jsonLoad[userBackup;$getUserVar[userBackup;$env[ID]]]
          $if[$env[userProfile;MUID]==;
            $let[logText;$get[logText]\n$parseDate[$getTimestamp;Locale] ❌ Failed to add backup for $username[$env[ID]] ($env[ID]). Has saved backup: $checkCondition[$env[userBackup]!={}]]
          ;
            $!jsonSet[userBackup;$env[userProfile]]
            $setUserVar[userBackup;$env[userBackup];$env[ID]]
            $let[logText;$get[logText]\n$parseDate[$getTimestamp;Locale] ✅ Added backup for $username[$env[ID]] ($env[ID])]
          ]
        ]

        $appendFile[$get[path];$get[logText]]

        $attachment[$get[path];backupLog№$get[logCount].log;false]
        $sendMessage[$getGlobalVar[logChannelID]]
      ;12h]
    ]
  `
}