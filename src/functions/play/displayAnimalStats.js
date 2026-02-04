export default {
  name: 'displayAnimalStats',
  code: `
    $if[$env[funcCache;animalIndexes]==;
      $jsonSet[funcCache;animalIndexes;$getGlobalVar[animalIndexes]]
    ]
    $jsonLoad[xpPerTier;$getGlobalVar[xpPerTier]]

    $let[animal;$env[playData;currentAnimal]]
    $let[i;$env[funcCache;animalIndexes;$get[animal]]]
    $let[wrI;$default[$env[userWardrobe;$get[animal]];0]]
    $let[emoji;$getAnimalVariantInfo[$get[animal];emoji;$get[wrI]]]
    $let[animalName;$getAnimalVariantInfo[$get[animal];name;$get[wrI]]]
    $let[exp;$env[playData;XP]]
    $let[tier;$env[playData;tier]]
    $let[maxExp;$env[xpPerTier;$get[tier];1]]
    $let[MC;$env[playData;MC]]
    $let[thumbnail;$getAnimalVariantInfo[$get[animal];img;$get[wrI]]]

    $addSection[
      $addTextDisplay[## $get[emoji] $get[animalName]]
      $addTextDisplay[## $separate[$get[MC]]$getGlobalVar[emoji]]
      $addTextDisplay[## $abbreviateNumber[$get[exp]] / $abbreviateNumber[$get[maxExp]] $tl[ui.play.xp]]
      $addThumbnail[$get[thumbnail]]
    ]
    $addTextDisplay[### 【$bar[$get[exp];$get[maxExp];15;█;░;]】]
  `
}