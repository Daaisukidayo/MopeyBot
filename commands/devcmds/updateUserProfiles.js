module.exports = {
  name: "updateprofiles",
  aliases: ["uup"],
  type: "messageCreate",
  code: `
    $reply
    $onlyForUsers[;$botOwnerID]
    $jsonLoad[allUserIDs;$getGlobalVar[allUserIDs]]
    $jsonLoad[newUserProfile;$getGlobalVar[userProfile]]
    $jsonLoad[profileKeys;$jsonKeys[newUserProfile]]
    $jsonLoad[animals;$readFile[json/animals.json]]
    $jsonLoad[animalsKeys;$jsonKeys[animals]]

    $arrayForEach[allUserIDs;ID; $c[Changes history json keys of all users (from "Animal Name" to "animalID")]

      $jsonLoad[userProfile;$getUserVar[userProfile;$env[ID]]]
      $jsonLoad[history;$env[userProfile;1hl;history]]
      $arrayLoad[newHistory]

      $if[$env[history;0]==;;

        $arrayForEach[history;obj;
          $jsonLoad[raresList;$env[obj;raresList]]
          $let[newTime;$unparseDate[$env[obj;time]]]        

          $jsonLoad[stats;
            {
              "points": $env[obj;points],
              "rares": $env[obj;rares],
              "endedAt": $get[newTime],
              "raresList": $env[obj;raresList]
            }
          ]

          $arrayPushJSON[newHistory;$env[stats]]

        ]

        $!jsonSet[userProfile;1hl;history;$env[newHistory]]
        $setUserVar[userProfile;$env[userProfile];$env[ID]]
      ]
    ]

    $sendMessage[$channelID;## ✅ Successfully updated all profiles!]

  `
}

// Changes history json keys of all users (from "Animal Name" to "animalID")
// $arrayForEach[allUserIDs;ID;

//  $jsonLoad[userProfile;$getUserVar[userProfile;$env[ID]]]
//  $jsonLoad[history;$env[userProfile;1hl;history]]
//  $arrayLoad[newHistory]

//  $if[$env[history;0]==;;

//    $arrayForEach[history;obj;
//      $jsonLoad[newRaresList;{}]
//      $jsonLoad[raresList;$env[obj;raresList]]
//      $jsonLoad[raresListEntries;$jsonEntries[raresList]]
//      $arrayForEach[raresListEntries;entry;
//        $loop[$arrayLength[animalsKeys];
//          $let[j;$math[$env[j] - 1]]
//          $let[animal;$arrayAt[animalsKeys;$get[j]]]
//          $let[name;$env[animals;$get[animal];variants;0;name]]

//          $if[$get[name]==$env[entry;0];
//            $!jsonSet[newRaresList;$get[animal];$env[entry;1;0]]
//            $break
//          ]
//        ;j;desc]

//      ]

//      $jsonLoad[stats;
//        {
//          "points": $env[obj;points],
//          "rares": $env[obj;rares],
//          "time": "$env[obj;time]",
//          "raresList": $env[newRaresList]
//        }
//      ]

//      $arrayPushJSON[newHistory;$env[stats]]

//    ]

//    $!jsonSet[userProfile;1hl;history;$env[newHistory]]
//    $setUserVar[userProfile;$env[userProfile];$env[ID]]
//  ]
//]


// adding/updating profile with new keys
// $arrayForEach[allUserIDs;uID;
//   $jsonLoad[oldUserProfile;$getUserVar[userProfile;$env[uID]]]
//
//   $arrayForEach[profileKeys;key;
//     $if[$env[oldUserProfile;$env[key]]==;;
//       $!jsonSet[newUserProfile;$env[key];$env[oldUserProfile;$env[key]]]
//     ]
//   ]
//   $setUserVar[userProfile;$env[newUserProfile];$env[uID]]
//   $jsonLoad[newUserProfile;$getGlobalVar[userProfile]]
// ]


// DEPRECATED. Combines all user variables into json object and adds id of every user to an array
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