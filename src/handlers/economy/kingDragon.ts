import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
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
        $addTextDisplay[$tl[ui.kingdragon.chooseUpgrade.$get[l]]]
        $addUpgradeMenuAnimalChoices[rareKingDragon]
      ;$getGlobalVar[rareKingDragonColor]]
    ;
      $addContainer[
        $addAuthorDisplay
        $addTextDisplay[$tl[ui.kingdragon.chooseUpgrade.$get[l]]]
        $addUpgradeMenuAnimalChoices[blackDragon]
      ;$getGlobalVar[defaultColor]]
    ]

    $newCommandTimeout
  `
})