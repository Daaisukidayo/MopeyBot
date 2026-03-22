export default [{
  name: 'handleKingdragon',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown

    $defer

    $let[luckRarity;$random[1;1000]]

    $if[$and[$env[userProfile;devMode]==1;$message!=];
      $let[luckRarity;$message]
    ]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.kingdragon.chooseUpgrade]]
      $if[$get[luckRarity]==1;
        $addUpgradeMenuAnimalChoices[rareKingDragon]
        $let[color;$getGlobalVar[rareKingDragonColor]]
      ;
        $addUpgradeMenuAnimalChoices[blackDragon]
        $let[color;$getGlobalVar[defaultColor]]
      ]
    ;$get[color]]

    $let[msgid;$function[
      $if[$isSlashCommand;
        $return[$interactionReply[;true]]
      ]
      $return[$sendMessage[$channelID;;true]]
    ]]

    $newCommandTimeout
  `
},{
  name: 'addUpgradeMenuAnimalChoices',
  params: [
    {
      name: 'animalID',
      required: true
    }
  ],
  brackets: false,
  code: `
    $jsonLoad[vars;$getAnimalInfo[$env[animalID];variants]]
    $jsonLoad[userPacks;$env[userProfile;userPacks]]
    $arrayUnshift[userPacks;s1;s2]

    $let[btns;0]

    $loop[$arrayLength[vars];
      $let[i;$math[$env[i] - 1]]
      $jsonLoad[variant;$arrayAt[vars;$get[i]]]

      $let[packId;$env[variant;packId]]
      $let[name;$env[variant;name]]
      $let[emoji;$env[variant;emoji]]

      $if[$arrayIncludes[userPacks;$get[packId]];;$continue]

      $if[$math[$get[btns]%3]==0;
        $addActionRow
      ]
      $addButton[$get[i]-$env[animalID]-kingdragon-$authorID;$get[name];Secondary;$get[emoji]]
      $letSum[btns;1]
    ;i;true]
  `
}]