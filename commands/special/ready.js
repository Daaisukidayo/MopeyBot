module.exports = {
  type: "ready",
  code: `
    $logger[Info;Bot $username[$botID] is ready]

    $setInterval[
      $setStatus[online;Watching;$guildCount servers]
    ;12s]

    $async[ $c[CACHING allRares]
      $deleteGlobalVar[allRares]
      $jsonLoad[raresMap;$getGlobalVar[raresMap]]
      $arrayForEach[raresMap;rareMap;
        $jsonLoad[allRaresFromCat;$env[rareMap;rares]]
        $arrayConcat[allRares;allRares;allRaresFromCat]
      ]
      $setGlobalVar[allRares;$env[allRares]]
      $logger[Info;Successfully loaded and cached «allRares» from «raresMap»]
    ]

    $if[$getGlobalVar[makeBackups];
      $async[
        $loop[-1; $c[Adding backups]
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
              $let[logText;$get[logText]\n$parseDate[$getTimestamp;Locale] ✅ Successfully added backup for $username[$env[ID]] ($env[ID])]
            ]
          ]

          $appendFile[$get[path];$get[logText]]

          $attachment[$get[path];backupLog№$get[logCount].log;false]
          $sendMessage[$getGlobalVar[logChannelID]]
          $wait[12h]
        ]
      ]
    ]

    $async[$loop[-1;
      $deleteGlobalVar[cachedLB]
      $jsonLoad[allUserIDs;$getGlobalVar[allUserIDs]]
    
      $arrayMap[allUserIDs;id;
        $jsonLoad[userProfile;$getUserVar[userProfile;$env[id]]]
        $return[$env[userProfile]]
      ;profiles]

      $arrayAdvancedSort[profiles;A;B;
        $math[$env[B;MC] - $env[A;MC]]
      ;result]

      $let[rowsPerPage;10]
      $let[position;0]
      $let[emoji;]
      $let[lbplace;]

      $jsonLoad[result;$arraySplice[result;0;$get[rowsPerPage]]]

      $arrayMap[result;res;
        $letSum[position;1]
        $!jsonSet[res;position;$get[position]]
        $return[$env[res]]
      ;result]

      $arrayForEach[result;res;
        $let[emoji;$if[$env[res;position]==1;🥇;$if[$env[res;position]==2;🥈;$if[$env[res;position]==3;🥉;⁘]]]]
        $let[lbplace;$get[lbplace]$get[emoji] $ordinal[$env[res;position]] ➤ $userDisplayName[$env[res;ID]]\n$getGlobalVar[blank] Coins: \`$separateNumber[$env[res;MC];.]\`$getGlobalVar[emoji]\n$getGlobalVar[blank] MUID: \`$env[res;MUID]\`\n\n]
      ]

      $setGlobalVar[cachedLB;$get[lbplace]]
      $wait[5m]
    ]]
  `
}