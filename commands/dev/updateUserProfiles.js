module.exports = {
  name: "updateprofiles",
  aliases: ["uup"],
  type: "messageCreate",
  code: `
    $onlyForUsers[;$botOwnerID]
    $reply
    $jsonLoad[allUserIDs;$getGlobalVar[allUserIDs]]
    $jsonLoad[newUserProfile;$getGlobalVar[userProfile]]
    $jsonLoad[profileKeys;$jsonKeys[newUserProfile]]
    
    $if[1==2;
    $arrayForEach[allUserIDs;uID;
      $jsonLoad[oldUserProfile;$getUserVar[userProfile;$env[uID]]]
      
      $arrayForEach[profileKeys;key;
        $if[$env[oldUserProfile;$env[key]]==;;
          $!jsonSet[newUserProfile;$env[key];$env[oldUserProfile;$env[key]]]
        ]
      ]
      $setUserVar[userProfile;$env[newUserProfile];$env[uID]]
      $jsonLoad[newUserProfile;$getGlobalVar[userProfile]]
    ]

    $sendMessage[$channelID;## ✅ Successfully updated all profiles!]

    ;
      $jsonLoad[limiters;{
        "lastDailyDay": -1,
        "lastWeeklyWeek": -1,
        "lastHLUsed": -1,
        "HLRandom": -1,
        "luckDesc": ""
      }]

      $userLeaderboard[MUID;desc;6;1;\n;data;pos;
        $let[id;$env[data;id]]
        $jsonLoad[CR;$getUserVar[caughtRareCategories;$get[id]]]
        $!jsonSet[newUserProfile;ID;$get[id]]
        $!jsonSet[newUserProfile;MC;$getUserVar[MC;$get[id]]]
        $!jsonSet[newUserProfile;acceptedRules;true]
        $!jsonSet[newUserProfile;testerMode;false]
        $!jsonSet[newUserProfile;onSlowmode;false]
        $!jsonSet[newUserProfile;isBanned;false]
        $!jsonSet[newUserProfile;hadAnn;true]
        $!jsonSet[newUserProfile;devMode;false]
        $!jsonSet[newUserProfile;rtMode;$getUserVar[rtMode;$get[id]]]
        $!jsonSet[newUserProfile;MUID;$getUserVar[MUID;$get[id]]]
        $!jsonSet[newUserProfile;l10n;EN]
        $!jsonSet[newUserProfile;caughtRareCategories;$env[CR]]
        $setUserVar[userProfile;$env[userProfile];$get[id]]
        $if[$arrayIncludes[allUserIDs;$get[id]]==false;
          $arrayPush[allUserIDs;$get[id]]
        ]
        $jsonLoad[newUserProfile;$getGlobalVar[userProfile]]

      ]
    ]

  `
}

/*
$userLeaderboard[MUID;desc;6;1;\n;data;pos;
  $let[id;$env[data;id]]
  $jsonLoad[CR;$getUserVar[caughtRareCategories;$get[id]]]
  $jsonLoad[userPacks;$getUserVar[userPacks;$get[id]]]
  $jsonLoad[userWardrobe;$getUserVar[userWardrobe;$get[id]]]
  $!jsonSet[userProfile;MC;$getUserVar[MC;$get[id]]]
  $!jsonSet[userProfile;acceptedRules;$getUserVar[acceptedRules;$get[id]]]
  $!jsonSet[userProfile;testerMode;$getUserVar[testerMode;$get[id]]]
  $!jsonSet[userProfile;onSlowmode;$getUserVar[onSlowmode;$get[id]]]
  $!jsonSet[userProfile;isBanned;$getUserVar[isBanned;$get[id]]]
  $!jsonSet[userProfile;hadAnn;$getUserVar[hadAnn;$get[id]]]
  $!jsonSet[userProfile;devMode;$getUserVar[dev;$get[id]]]
  $!jsonSet[userProfile;rtMode;$getUserVar[rtMode;$get[id]]]
  $!jsonSet[userProfile;MUID;$getUserVar[MUID;$get[id]]]
  $!jsonSet[userProfile;l10n;$getUserVar[l10n;$get[id]]]
  $!jsonSet[userProfile;caughtRareCategories;$env[CR]]
  $!jsonSet[userProfile;userPacks;$env[userPacks]]
  $!jsonSet[userProfile;userWardrobe;$env[userWardrobe]]
  $!jsonSet[userProfile;ID;$get[id]]
  $setUserVar[userProfile;$env[userProfile];$get[id]]
  $if[$arrayIncludes[allUserIDs;$get[id]]==false;
    $arrayPush[allUserIDs;$get[id]]
  ]
]
*/