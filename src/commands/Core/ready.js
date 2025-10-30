export default {
  type: "clientReady",
  code: `
    $logger[Info;Bot $username[$botID] is ready]

    $setInterval[
      $setStatus[Online;Watching;$guildCount servers!]
    ;12s]

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
    

    $async[ $c[caching LEADERBOARD]
      $loop[-1;
        $deleteGlobalVar[cachedLB]
        $jsonLoad[allUserIDs;$getGlobalVar[allUserIDs]]
      
        $arrayMap[allUserIDs;id;
          $jsonLoad[UP;$getUserVar[userProfile;$env[id]]]
          $jsonLoad[data;{}]

          $!jsonSet[data;MC;$env[UP;MC]]
          $!jsonSet[data;ID;$env[UP;ID]]
          $!jsonSet[data;MUID;$env[UP;MUID]]
          
          $return[$env[data]]
        ;profiles]

        $arrayAdvancedSort[profiles;A;B;
          $return[$math[$env[B;MC] - $env[A;MC]]]
        ;result]

        $let[pos;0]
        $arrayMap[result;elem;
          $letSum[pos;1]
          $!jsonSet[elem;pos;$get[pos]]
          $return[$env[elem]]
        ;cachedLB]

        $setGlobalVar[cachedLB;$env[cachedLB]]
        $wait[2m]
      ]
    ]

    $async[ $c[CACHING animalsIndexes]
      $deleteGlobalVar[animalsIndexes]
      $jsonLoad[animalsIndexes;{}]
      $jsonLoad[animals;$readFile[src/json/animals.json]]
      $loop[$arrayLength[animals];
        $let[i;$math[$env[i] - 1]]
        $let[animalID;$env[animals;$get[i];ID]]
        $!jsonSet[animalsIndexes;$get[animalID];$get[i]]
      ;i;true]
      $setGlobalVar[animalsIndexes;$env[animalsIndexes]]
      $logger[Info;Cached «animalsIndexes»]
    ]

    $async[ $c[CACHING arenaEnemies]
      $deleteGlobalVar[arenaEnemies]
      $jsonLoad[animals;$readFile[src/json/animals.json]]
      $arrayMap[animals;obj;
        $if[$env[obj;tier]>=15;
          $if[$includes[$toLowercase[$env[obj;fullName]];rare];;
            $return[$env[obj;ID]]
          ]
        ]
      ;enemies]
      $setGlobalVar[arenaEnemies;$env[enemies]]
      $logger[Info;Cached «arenaEnemies»]
    ]

    $async[ $c[CACHING allRares]
      $deleteGlobalVar[allRares]
      $jsonLoad[allRaresData;$getGlobalVar[allRaresData]]
      $jsonLoad[allRaresData;$jsonEntries[allRaresData]]
      $jsonLoad[animals;$readFile[src/json/animals.json]]
      $arrayLoad[allRaresFromSnora]
      
      $arrayForEach[allRaresData;elem;
        $let[animalID;$env[elem;0]]
        $let[animalName;$env[animals;$get[animalID];variants;0;name]]
        $jsonLoad[rares;$env[elem;1]]
        $arrayForEach[rares;rare;
          $arrayPush[allRaresFromSnora;$env[rare]]
        ]
      ]
      $setGlobalVar[allRares;$env[allRaresFromSnora]]
      $logger[Info;Cached «allRares»]
    ]

    $if[$getGlobalVar[sendReminders];
      $setInterval[
        $jsonLoad[allUserIDs;$getGlobalVar[allUserIDs]]

        $c[REMIND DAILY REWARD]
        
        $if[$getGlobalVar[lastCheckedDayInReady;-1]!=$day; 
          $setGlobalVar[lastCheckedDayInReady;$day]
          $loop[$arrayLength[allUserIDs];
            $let[userID;$env[allUserIDs;$math[$env[i] - 1]]]
            $jsonLoad[userReminders;$getUserVar[userReminders;$get[userID]]]
            $jsonLoad[userProfile;$getUserVar[userProfile;$get[userID]]]

            $setUserVar[caughtRaresInRaretryrun;0;$get[userID]]
            $setUserVar[caughtRaresInRaretry;0;$get[userID]]

            $if[$env[userProfile;limiters;lastDailyDay]==$day;$continue]
            $if[$arrayIncludes[userReminders;daily];;$continue]
            $if[$isUserDMEnabled[$get[userID]];;$continue]

            ${REMINDER_EMBED('Daily reward and checklist quests are available!')}
            $sendDM[$get[userID]]
          ;i;true]
        ]

        $c[REMIND WEEKLY REWARD]
        $if[$getGlobalVar[lastCheckedWeeklyInReady;-1]!=$week; 
          $setGlobalVar[lastCheckedWeeklyInReady;$week]

          $loop[$arrayLength[allUserIDs];
            $let[userID;$env[allUserIDs;$math[$env[i] - 1]]]
            $jsonLoad[userReminders;$getUserVar[userReminders;$get[userID]]]
            $jsonLoad[userProfile;$getUserVar[userProfile;$get[userID]]]

            $if[$env[userProfile;limiters;lastWeeklyWeek]==$week;$continue]
            $if[$arrayIncludes[userReminders;weekly];;$continue]
            $if[$isUserDMEnabled[$get[userID]];;$continue]

            ${REMINDER_EMBED('Weekly reward is available')}
            $sendDM[$get[userID]]
          ;i;true]
        ]

      ;5m]
    ]

    $async[$deleteVars[LBpages]]
  `
}

function REMINDER_EMBED(content) {
  return `
    $addContainer[
      $addTextDisplay[# 🔔__REMINDER__🔔]
      $addSeparator[Large]
      $addTextDisplay[## ${content}]
    ;$getGlobalVar[defaultColor]]
  `
}