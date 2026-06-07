export default {
  name: 'animalsEmbed',
  params: [
    {
      name: '_menuId',
      required: true
    }
  ],
  code: `
    $let[l;$env[userProfile;language]]
    $jsonLoad[userSkinPacks;$env[userProfile;userPacks]]
    $arrayUnshift[userSkinPacks;s1;s2;s2w]

    $let[legacyWinterPackI;$arrayIndexOf[userSkinPacks;legacySP]]
    $if[$get[legacyWinterPackI]!=-1;
      $!arraySplice[userSkinPacks;$get[legacyWinterPackI];0;legacySPw]
    ]

    $let[currentAnimalVariant;$default[$env[userWardrobe;$get[animalID]];0]]
    $let[currentAnimalEmoji;$getAnimalVariantInfo[$get[animalID];emoji;$get[currentAnimalVariant]]]
    $let[fullName;$getAnimalInfo[$get[animalID];fullName]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[$get[l];ui;wardrobe.availableSkins;$get[fullName]]]
      
      $addActionRow
      $addStringSelectMenu[$env[_menuId]-$authorID;$tl[$get[l];ui;wardrobe.menuTitleSelectSkin]]

      $loop[25;
        $let[i;$math[$env[i] - 1]] 
        $if[$getAnimalVariantInfo[$get[animalID];name;$get[i]]==undefined;$break]
        $let[packId;$getAnimalVariantInfo[$get[animalID];packId;$get[i]]]

        $loop[$arrayLength[userSkinPacks];
          $let[j;$math[$env[j] - 1]]
          $let[purchasedPackId;$arrayAt[userSkinPacks;$get[j]]]

          $if[$get[packId]==$get[purchasedPackId];;$continue]

          $let[animalName;$getAnimalVariantInfo[$get[animalID];name;$get[i]]]
          $let[animalDesc;$tl[$get[l];data;shopSkinPacks.$get[purchasedPackId]]]
          $let[animalEmoji;$getAnimalVariantInfo[$get[animalID];emoji;$get[i]]]
          
          $addOption[$get[animalName];$get[animalDesc];$get[animalID]-$get[i];$get[animalEmoji];$checkCondition[$get[currentAnimalVariant]==$get[i]]]
        ;j;true]
      ;i;true]

      $addSeparator

      $addTextDisplay[$tl[$get[l];ui;wardrobe.equippedSkin]]
      $addTextDisplay[# $get[currentAnimalEmoji]]
    ;$getGlobalVar[defaultColor]]
  `
}