import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "wardrobeAnimalsEmbed",
  description: "a page of the all animals list: a skin menu per animal, by tier",
  params: [
    {
      name: "wardrobeVar",
      description: "var with the user's wardrobe",
      type: ArgType.String,
    },
    {
      name: "page",
      description: "the page, wraps around when out of range",
      type: ArgType.Number,
    },
  ],
  code: `
    $ref[wardrobe;$env[wardrobeVar]]
    $let[l;$jsonGet[userProfile;language]]
    $jsonLoad[userSkins;$getUserVar[userSkins]]
    $jsonLoad[freePacks;$getGlobalVar[freeSkinPacks]]
    $jsonLoad[ids;$wearableAnimals]

    $c[pages wrap around]
    $let[pageSize;$getGlobalVar[wardrobeAnimalsPageSize]]
    $let[pages;$max[1;$arrayPageCount[ids;$get[pageSize]]]]
    $let[page;$env[page]]
    $let[page;$if[$get[page]<1;$get[pages];$if[$get[page]>$get[pages];1;$get[page]]]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.wardrobe.listTitle.$get[l]]]
      $jsonLoad[pageIds;$arrayPage[ids;$get[page];$get[pageSize]]]
      $c[the worn skins' names for screen readers, nothing in the wardrobe = the first skin like on the card]
      $addMediaGallery[$addMediaItem[$wardrobeCard[pageIds;$env[wardrobeVar]];$arrayJoin[$arrayMap[pageIds;id;$return[$getAnimalInfo[$env[id];name;$default[$jsonGet[wardrobe;$env[id]];$getAnimalInfo[$env[id];id;0]]]]];, ]]]

      $c[the worn skin is picked, nothing in the wardrobe = the first skin. owned only, cut to 25 because that's all a select menu fits]
      $arrayForEach[$arrayPage[ids;$get[page];$get[pageSize]];id;
        $let[current;$default[$jsonGet[wardrobe;$env[id]];$getAnimalInfo[$env[id];id;0]]]
        $addTextDisplay[### $getAnimalInfo[$env[id];fullName]]
        $addActionRow
        $addStringSelectMenu[wardrobe-pick-$env[id]-$get[page]-$authorID;$tl[ui.wardrobe.menuTitleSelectSkin.$get[l]]]
        $arrayFilter[$getAnimalInfo[$env[id];skins];skin;$or[$arrayIncludes[freePacks;$jsonGet[skin;packId]];$arrayIncludes[userSkins;$jsonGet[skin;id]]];owned]
        $arrayForEach[$arraySlice[owned;;0;25];skin;
          $arrayLoad[idParts;.;$jsonGet[skin;id]]
          $addOption[$jsonGet[skin;name];$skinCollectionName[$jsonGet[idParts;1]];$jsonGet[skin;id];$jsonGet[skin;emoji];$checkCondition[$get[current]==$jsonGet[skin;id]]]
        ]
      ]

      $addSeparator
      $addActionRow
      $addButton[wardrobe-page-$math[$get[page] - 1]-$authorID;$tl[ui.wardrobe.buttonPrevious.$get[l]];Secondary;⬅️]
      $addButton[wardrobe-back-menu-$authorID;$tl[ui.wardrobe.buttonBack.$get[l]];Secondary;↩️]
      $addButton[wardrobe-page-$math[$get[page] + 1]-$authorID;$tl[ui.wardrobe.buttonNext.$get[l]];Secondary;➡️]
      $addButton[wardrobe-pageModal-$get[page]-$authorID;$tl[ui.wardrobe.pageButton.$get[l];$get[page];$get[pages]];Secondary;🔎]
    ;$getGlobalVar[defaultColor]]
  `,
})
