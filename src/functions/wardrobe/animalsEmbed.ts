export default {
  name: 'animalsEmbed',
  params: [
    {
      name: '_animalId',
    },
    {
      name: '_switchToNext',
      type: "Boolean"
    }
  ],
  code: `
    $let[l;$env[userProfile;language]]
    $let[animalId;$env[_animalId]]
    $jsonLoad[userSkinPacks;$env[userProfile;userPacks]]
    $arrayUnshift[userSkinPacks;s1;s2;s2w]

    $let[legacyWinterPackI;$arrayIndexOf[userSkinPacks;legacySP]]
    $if[$get[legacyWinterPackI]!=-1;
      $!arraySplice[userSkinPacks;$get[legacyWinterPackI];0;legacySPw]
    ]

    $let[currentAnimalVariant;$default[$env[userWardrobe;$get[animalId]];0]]
    $let[currentAnimalEmoji;$getAnimalVariantInfo[$get[animalId];emoji;$get[currentAnimalVariant]]]
    $let[fullName;$getAnimalInfo[$get[animalId];fullName]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[$get[l];ui;wardrobe.availableSkins;$get[fullName]]]
      
      $addActionRow
      $addStringSelectMenu[wardrobe-animal-$get[animalId]-$authorID-$env[_switchToNext];$tl[$get[l];ui;wardrobe.menuTitleSelectSkin]]

      $loop[25;
        $let[i;$math[$env[i] - 1]] 
        $if[$getAnimalVariantInfo[$get[animalId];name;$get[i]]==undefined;$break]
        $let[packId;$getAnimalVariantInfo[$get[animalId];packId;$get[i]]]

        $loop[$arrayLength[userSkinPacks];
          $let[j;$math[$env[j] - 1]]
          $let[purchasedPackId;$arrayAt[userSkinPacks;$get[j]]]

          $if[$get[packId]==$get[purchasedPackId];;$continue]

          $let[animalName;$getAnimalVariantInfo[$get[animalId];name;$get[i]]]
          $let[animalDesc;$tl[$get[l];data;shopSkinPacks.$get[purchasedPackId]]]
          $let[animalEmoji;$getAnimalVariantInfo[$get[animalId];emoji;$get[i]]]
          
          $addOption[$get[animalName];$get[animalDesc];$get[i];$get[animalEmoji];$checkCondition[$get[currentAnimalVariant]==$get[i]]]
        ;j;true]
      ;i;true]

      $addSeparator

      $addTextDisplay[$tl[$get[l];ui;wardrobe.equippedSkin]]
      $addTextDisplay[# $get[currentAnimalEmoji]]
    ;$getGlobalVar[defaultColor]]
  `
}