export default {
  type: "clientReady",
  code: `
    $logger[Info;Bot $username[$botID] is ready]

    $setInterval[
      $setStatus[Online;Watching;$guildCount servers]
    ;12s]

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

    $if[$getGlobalVar[makeBackups];
      $async[
        $loop[-1;
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
        $let[lbplace;$get[lbplace]$get[emoji] $ordinal[$env[res;position]] ➤ \`$username[$env[res;ID]]\`\n$getGlobalVar[blank] Coins: \`$separateNumber[$env[res;MC];,]\`$getGlobalVar[emoji]\n$getGlobalVar[blank] MUID: \`$env[res;MUID]\`\n\n]
      ]

      $setGlobalVar[cachedLB;$get[lbplace]]
      $wait[5m]
    ]]

    $async[
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

    $async[
      $jsonLoad[animals;$readFile[src/json/animals.json]]

      $arrayMap[animals;obj;
        $if[$env[obj;tier]>=15;
          $if[$includes[$toLowercase[$env[obj;fullName]];luck];;
            $jsonLoad[variants;$env[obj;variants]]
            $return[$default[$env[obj;variants;$arrayRandomIndex[variants];emoji];❓]]
          ]
        ]
      ;enemies]
      $setGlobalVar[arenaEnemies;$env[enemies]]
      $logger[Info;Cached «arenaEnemies»]
    ]
  `
}