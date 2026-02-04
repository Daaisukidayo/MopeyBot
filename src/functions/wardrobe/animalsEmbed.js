export default {
  name: 'animalsEmbed',
  params: [
    {
      name: 'menu_id',
      required: true
    }
  ],
  code: `
    $jsonLoad[userSPs;$env[userProfile;userPacks]]
    $arrayUnshift[userSPs;s1;s2;s2w]

    $let[legacyWinterPackI;$arrayIndexOf[userSPs;legacySP]]
    $if[$get[legacyWinterPackI]!=-1;
      $!arraySplice[userSPs;$get[legacyWinterPackI];0;legacySPw]
    ]

    $let[currentAnimalVariant;$default[$env[userWardrobe;$get[animalID]];0]]
    $let[currentAnimalEmoji;$getAnimalVariantInfo[$get[animalID];emoji;$get[currentAnimalVariant]]]
    $let[fullName;$getAnimalInfo[$get[animalID];fullName]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.wardrobe.availableSkins;$get[fullName]]]
      
      $addActionRow
      $addStringSelectMenu[$env[menu_id]-$authorID;$tl[ui.wardrobe.menuTitleSelectSkin]]

      $loop[25;
        $let[i;$math[$env[i] - 1]] 
        $if[$getAnimalVariantInfo[$get[animalID];name;$get[i]]==undefined;$break]
        $let[packId;$getAnimalVariantInfo[$get[animalID];packId;$get[i]]]

        $loop[$arrayLength[userSPs];
          $let[j;$math[$env[j] - 1]]
          $let[purchasedPackId;$arrayAt[userSPs;$get[j]]]

          $if[$get[packId]==$get[purchasedPackId];;$continue]

          $let[animalName;$getAnimalVariantInfo[$get[animalID];name;$get[i]]]
          $let[animalDesc;$tl[data.shopSkinPacks.$get[purchasedPackId]]]
          $let[animalEmoji;$getAnimalVariantInfo[$get[animalID];emoji;$get[i]]]
          
          $addOption[$get[animalName];$get[animalDesc];$get[animalID]-$get[i];$get[animalEmoji]]
        ;j;true]
      ;i;true]
      $addSeparator
      $addTextDisplay[$tl[ui.wardrobe.equippedSkin]]
      $addTextDisplay[# $get[currentAnimalEmoji]]
    ;$getGlobalVar[defaultColor]]
  `
}