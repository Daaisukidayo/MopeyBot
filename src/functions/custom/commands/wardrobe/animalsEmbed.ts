import { ArgType, ForgeFunction } from "@tryforge/forgescript";

export default new ForgeFunction({
  name: 'animalsEmbed',
  description: "Generates a wardrobe embed listing available animal skins for a user.",
  params: [
    {
      name: '_animalId',
      description: "ID of the animal to display.",
      type: ArgType.String,
    },
    {
      name: '_switchToNext',
      description: "Whether to switch to the next skin after selection.",
      type: ArgType.Boolean,
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
    $let[currentAnimalEmoji;$getAnimalInfo[$get[animalId];emoji;$get[currentAnimalVariant]]]
    $let[fullName;$getAnimalInfo[$get[animalId];fullName]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.wardrobe.availableSkins.$get[l];$get[fullName]]]
      
      $addActionRow
      $addStringSelectMenu[wardrobe-animal-$get[animalId]-$authorID-$env[_switchToNext];$tl[ui.wardrobe.menuTitleSelectSkin.$get[l]]]

      $loop[25;
        $let[i;$math[$env[i] - 1]] 
        $if[$getAnimalInfo[$get[animalId];name;$get[i]]==undefined;$break]
        $let[packId;$getAnimalInfo[$get[animalId];packId;$get[i]]]

        $forOf[userSkinPacks;purchasedPackId;
          $if[$get[packId]==$env[purchasedPackId];;$continue]

          $let[animalName;$getAnimalInfo[$get[animalId];name;$get[i]]]
          $let[animalDesc;$tl[data.shopSkinPacks.$env[purchasedPackId].$get[l]]]
          $let[animalEmoji;$getAnimalInfo[$get[animalId];emoji;$get[i]]]
          
          $addOption[$get[animalName];$get[animalDesc];$get[i];$get[animalEmoji];$checkCondition[$get[currentAnimalVariant]==$get[i]]]
        ]
      ;i;true]

      $addSeparator

      $addTextDisplay[$tl[ui.wardrobe.equippedSkin.$get[l]]]
      $addTextDisplay[# $get[currentAnimalEmoji]]
    ;$getGlobalVar[defaultColor]]
  `
})