"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "animalsEmbed",
    description: "Generates a wardrobe embed listing available animal skins for a user.",
    params: [
        {
            name: "wardrobeVar",
            description: "The name of the variable that holds the user's wardrobe.",
            type: forgescript_1.ArgType.String,
        },
        {
            name: "animalId",
            description: "ID of the animal to display.",
            type: forgescript_1.ArgType.String,
        },
        {
            name: "switchToNext",
            description: "Whether to switch to the next skin after selection.",
            type: forgescript_1.ArgType.Boolean,
        },
    ],
    code: `
    $ref[wardrobe;$env[wardrobeVar]]
    $let[l;$jsonGet[userProfile;language]]
    $let[animalId;$env[animalId]]
    $jsonLoad[userSkinPacks;$jsonGet[userProfile;userPacks]]
    $arrayUnshift[userSkinPacks;s1;s2;s2w]

    $c[The legacy pack also unlocks its winter skins]
    $if[$arrayIncludes[userSkinPacks;legacySP];$arrayPush[userSkinPacks;legacySPw]]

    $c[The wardrobe keeps the id of the equipped skin. Without one the first skin is worn]
    $let[currentSkin;$default[$jsonGet[wardrobe;$get[animalId]];$getAnimalInfo[$get[animalId];id;0]]]
    $let[currentAnimalEmoji;$getAnimalInfo[$get[animalId];emoji;$get[currentSkin]]]
    $let[fullName;$getAnimalInfo[$get[animalId];fullName]]

    $c[Previous and Next go through the animals with more than one skin in cache order, like one by one, wrapping around]
    $cacheAnimalsData
    $getCache[animals;animalsData;animals]
    $getCache[animals;animalIndexes;animalIndexes]
    $let[index;$jsonGet[animalIndexes;$get[animalId]]]
    $let[prevId;$if[$get[index]>0;$jsonGet[$arrayFindLast[$arraySlice[animals;;0;$get[index]];animal;$jsonSize[animal;variants]>1];ID]]]
    $let[nextId;$jsonGet[$arrayFind[$arraySlice[animals;;$math[$get[index] + 1]];animal;$jsonSize[animal;variants]>1];ID]]
    $if[$get[prevId]==;$let[prevId;$jsonGet[$arrayFindLast[animals;animal;$jsonSize[animal;variants]>1];ID]]]
    $if[$get[nextId]==;$let[nextId;$jsonGet[$arrayFind[animals;animal;$jsonSize[animal;variants]>1];ID]]]

    $c[Back goes to the start menu one by one, else to the animals of this tier]
    $let[backTo;$if[$env[switchToNext];menu;$getAnimalInfo[$get[animalId];tier]]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.wardrobe.availableSkins.$get[l];$get[fullName]]]
      
      $addActionRow
      $addStringSelectMenu[wardrobe-animal-$get[animalId]-$authorID-$env[switchToNext];$tl[ui.wardrobe.menuTitleSelectSkin.$get[l]]]

      $c[A select menu holds 25 options at most]
      $arrayForEach[$arraySlice[$getAnimalInfo[$get[animalId];variants];;0;25];variant;
        $if[$arrayIncludes[userSkinPacks;$jsonGet[variant;packId]];
          $addOption[$jsonGet[variant;name];$tl[data.shopSkinPacks.$jsonGet[variant;packId].$get[l]];$jsonGet[variant;id];$jsonGet[variant;emoji];$checkCondition[$get[currentSkin]==$jsonGet[variant;id]]]
        ]
      ]

      $addSeparator

      $addTextDisplay[$tl[ui.wardrobe.equippedSkin.$get[l]]]
      $addTextDisplay[# $get[currentAnimalEmoji]]

      $addActionRow
      $addButton[wardrobe-goto-$get[prevId]-$authorID-$env[switchToNext];$tl[ui.wardrobe.buttonPrevious.$get[l]];Secondary;⬅️]
      $addButton[wardrobe-back-$get[backTo]-$authorID;$tl[ui.wardrobe.buttonBack.$get[l]];Secondary;↩️]
      $addButton[wardrobe-goto-$get[nextId]-$authorID-$env[switchToNext];$tl[ui.wardrobe.buttonNext.$get[l]];Secondary;➡️]
    ;$getGlobalVar[defaultColor]]
  `,
});
//# sourceMappingURL=animalsEmbed.js.map