import universalSnippets from "./universalSnippets.js"

export default {
  timeLeft(time, id) { return `$sendMessage[$channelID;# <@${id}> You have ${time} left!]` },

  interval(id = '$authorID') {
    return `
      $setInterval[
        $setUserVar[1htime|$channelID;$math[$getUserVar[1htime|$channelID;${id}] + 1];${id}]

        $switch[$getUserVar[1htime|$channelID;${id}];
          $case[1800;   ${this.timeLeft('30m', id)}  ]
          $case[3540;   ${this.timeLeft('1m',  id)}  ]
          $case[3597;   ${this.timeLeft('3s',  id)}  ]
          $case[3598;   ${this.timeLeft('2s',  id)}  ]
          $case[3599;   ${this.timeLeft('1s',  id)}  ] 
          $case[3600;
            ${this.stopUserInterval(id)}
            $sendMessage[$channelID;
              ${universalSnippets.loadProfile(id)}
              $addContainer[
                $callFunction[newAuthor]
                $addSeparator[Large]
                $addTextDisplay[# 1 Hour Luck Ended!]
                $addSeparator[Large]
                $addTextDisplay[## You can continue typing if you didn't manage to finish]
                $addTextDisplay[## Press «\`Confirm\`» button to end your challenge whenever you want]
                $addSeparator
                $addActionRow
                $addButton[confirmEndingChallenge-${id};Confirm;Success;✅]
              ;$getGlobalVar[luckyColor]]
            ]
          ] 
        ]
      ;1s;${this.userIntervalName(id)}]
    `
  },

  isActiveChallenge() {
    return `
      $jsonLoad[challengeProgress;$getUserVar[challengeProgress|$channelID]]
      $onlyIf[$env[challengeProgress]!=;
        $callFunction[embed;error] 
        $description[## You don't have an active challenge!]
      ]
    `
  },

  loadGJSON() {
    return `
      $if[$env[userProfile]==;${universalSnippets.loadProfile()}]
      $jsonLoad[allRaresList;$env[challengeProgress;list]]
      $jsonLoad[userSettings;$env[userProfile;1hl;settings]]
      $jsonLoad[challengeData;$getGlobalVar[challengeData]]
      $jsonLoad[chartLimits;$getGlobalVar[chartLimits]]
      $jsonLoad[animals;$readFile[src/json/animals.json]]
      $jsonLoad[animalsIndexes;$getGlobalVar[animalsIndexes]]
      $jsonLoad[allRaresData;$getGlobalVar[allRaresData]]
      $jsonLoad[allRaresDataEntries;$jsonEntries[allRaresData]]
      $jsonLoad[allRares;$getGlobalVar[allRares]]
    `
  },

  listGenerator({ arrayName = 'content', listName = 'raresList', addPoints = false } = {}) {
    return `
      $jsonLoad[listEntries;$jsonEntries[${listName}]]
      $arrayLoad[${arrayName}]
      $arrayLoad[preContent]
      $arrayLoad[displacement]

      $arrayMap[listEntries;entry;
        $let[animalID;$env[entry;0]]
        $let[quantity;$env[entry;1]]
        $let[animalIndex;$env[animalsIndexes;$get[animalID]]]
        $let[animalDisplay;$env[animals;$get[animalIndex];variants;0;emoji]]

        $if[${addPoints};
          $jsonLoad[output;$callFunction[findingRareInChallengeDataBase;$get[animalID]]]
          $letSum[totalPoints;$math[$env[output;points] * $get[quantity]]]
          $letSum[totalRares;$get[quantity]]
        ]

        $return[$get[animalDisplay]\`$get[quantity]\`]
      ;preContent]

      $if[$arrayLength[preContent]==0;
        $arrayLoad[${arrayName}; ;None]
      ;
        $loop[$arrayLength[preContent];
          $if[$math[($env[i] - 1) % $getGlobalVar[maxRowsInRaresList]]==0;
            $arrayPushJSON[displacement;$arraySplice[preContent;0;$getGlobalVar[maxRowsInRaresList]]]
          ]
        ;i;true]

        $arrayMap[displacement;page;
          $return[$arrayJoin[page; ]]
        ;${arrayName}]
      ]
    `
  },

  setChallengeVars(id = '$authorID', teamID = -1) {
    return `
      $jsonLoad[challengeProgress;{
        "started": true,
        "paused": false,
        "points": "0",
        "rares": "0",
        "userID": "${id}",
        "teamID": "${teamID}",
        "list": {}
      }]
      $setUserVar[1htime|$channelID;0;${id}]
      $setUserVar[challengeProgress|$channelID;$env[challengeProgress];${id}]
    `
  },

  listDesign(arrayName = 'content') {
    return `
      $addMediaGallery[$addMediaItem[https://i.postimg.cc/65z7tRMd/upperRow.png]]
      $addTextDisplay[# $arrayJoin[${arrayName};\n# ]]
      $addMediaGallery[$addMediaItem[https://i.postimg.cc/yY7JMny1/lowerRow.png]]
    `
  },

  raresLimit() { // requires loaded: userSettings, chartLimits, challengeData, allRaresList, limitsContent
    return `
      $if[$get[unlimitedRares];;
        $arrayForEach[chartLimits;obj;
          $loop[$arrayLength[challengeData];
            $jsonLoad[data;$arrayAt[challengeData;$math[$env[i] - 1]]]

            $let[dataCategory;$env[data;category]]
            $let[objCategory;$env[obj;category]]

            $if[$get[dataCategory]==$get[objCategory];;$continue]

            $let[limit;$env[obj;limit]]
            $jsonLoad[challengeRares;$env[data;rares]]

            $arrayForEach[challengeRares;rare;
              $let[displayRare;$env[animals;$env[animalsIndexes;$env[rare]];variants;0;emoji]]
              $let[quantity;$default[$env[allRaresList;$env[rare]];0]]

              $if[$get[quantity]<$get[limit];
                $arrayPush[limitsContent;$get[displayRare]\`$get[quantity]\`|\`$get[limit]\`]
              ]
            ]
            $break
          ;i;true]
        ]
      ]
    `
  },

  userIntervalName(id = '$authorID') { return `1HLUCK-${id}|$channelID` },
  stopUserInterval(id = '$authorID') { return `$!stopInterval[${this.userIntervalName(id)}]` },

  clearUserChallengeVars(id = '$authorID') {
    return `
      ${this.stopUserInterval(id)}
      $deleteUserVar[challengeProgress|$channelID;${id}]
      $deleteUserVar[1htime|$channelID;${id}]
    `
  },
}
