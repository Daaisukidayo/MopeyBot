import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "handleRandomrare",
  code: `
    $reply
    $nomention
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $checkProfile
    $addCooldown
    $defer

    $c[raretry groups hold every live rare, sorted into categories]
    $getCache[rares;raretryGroups;rareGroups]
    $getCache[rares;raretryCategoryOf;categoryOf]
    $let[animalId;$arraySample[$arrayFlat[rareGroups]]]
    $let[category;$jsonGet[categoryOf;$get[animalId]]]
    $jsonLoad[categoryData;$jsonGet[$getGlobalVar[raretryCategories];$get[category]]]
    $let[color;$jsonGet[categoryData;color]]
    $let[r0;$getAnimalInfo[$get[animalId];rarity.0]]
    $let[r1;$getAnimalInfo[$get[animalId];rarity.1]]

    $c[no coins and no mode here, the mode line shows the percent in grey like coins]
    $let[image;$raretryCard[$get[animalId];$get[r0]/$separate[$get[r1]] · $tl[data.raretryCategories.$jsonGet[categoryData;id].$get[l]];0;$round[$math[$get[r0] / $get[r1] * 100];2]%;b9bbc6;$get[color];0]]

    $addContainer[
      $addAuthorDisplay
      $addMediaGallery[$addMediaItem[$get[image]]]
    ;$get[color]]
  `,
})
