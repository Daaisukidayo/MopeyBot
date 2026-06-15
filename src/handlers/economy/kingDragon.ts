export default [{
  name: 'handleKingdragon',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $defer

    $let[luckRarity;$random[1;1000]]

    $if[$and[$env[userProfile;devMode]==1;$message!=];
      $let[luckRarity;$message]
    ]
    
    $if[$get[luckRarity]==1;
      $addContainer[
        $addAuthorDisplay
        $addTextDisplay[$tl[$get[l];ui;kingdragon.chooseUpgrade]]
        $addUpgradeMenuAnimalChoices[rareKingDragon]
      ;$getGlobalVar[rareKingDragonColor]]
    ;
      $addContainer[
        $addAuthorDisplay
        $addTextDisplay[$tl[$get[l];ui;kingdragon.chooseUpgrade]]
        $addUpgradeMenuAnimalChoices[blackDragon]
      ;$getGlobalVar[defaultColor]]
    ]

    $newCommandTimeout
  `
},{
  name: 'addUpgradeMenuAnimalChoices',
  params: [
    {
      name: 'animalId',
      required: true
    }
  ],
  code: `
    $jsonLoad[vars;$getAnimalInfo[$env[animalId];variants]]
    $jsonLoad[userPacks;$env[userProfile;userPacks]]
    $arrayUnshift[userPacks;s1;s2]

    $let[buttonsQuantity;0]

    $loop[$arrayLength[vars];
      $let[i;$math[$env[i] - 1]]
      $jsonLoad[variant;$arrayAt[vars;$get[i]]]

      $let[packId;$env[variant;packId]]
      $let[name;$env[variant;name]]
      $let[emoji;$env[variant;emoji]]

      $if[$arrayIncludes[userPacks;$get[packId]]==false;$continue]

      $if[$math[$get[buttonsQuantity] % 3]==0;
        $addActionRow
      ]
      $addButton[kingdragon-$env[animalId]-$get[i]-$authorID;$get[name];Secondary;$get[emoji]]
      $letSum[buttonsQuantity;1]
    ;i;true]
  `
}]