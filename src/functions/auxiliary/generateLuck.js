/**
 * Generates a luck-based object with weighted distributions for rare groups
 * @function generateLuck
 * @description Processes rare animal groups and creates probability distributions based on rarity tiers.
 * Accounts for user-owned packs and filters locked shop items.
 * 
 * @param {Array} rareGroups - Array of rare animal groups where:
 *   - [0] = common animal (fallback if no rare exists)
 *   - [1] = primary rare animal (base rarity count)
 *   - [2...n] = additional rare variants (weighted by individual rarity counts)
 * 
 * @returns {Object} result - Luck object with structure:
 *   - Keys: common/rare animal names
 *   - Values: shuffled arrays of animals with probability weights applied
 *   
 * @example1
 *  Input rareGroups: [["common_cat", "rare_cat", "epic_cat"], [...]]
 *  Output: { "common_cat": ["rare_cat", "common_cat", "epic_cat", "common_cat", ...] }
 *   
 * @example2
 *  Input rareGroups: [[null, "rare_cat", "epic_cat"], [...]]
 *  Output: { "rare_cat": ["rare_cat", "common_cat", "epic_cat", "common_cat", ...] }
 * 
 * @private
 * @note Requires $env[userProfile;userPacks] for pack validation
 * @note Skips animals marked as "shop" if user doesn't own lockedSP pack
 */

export default {
  name: "generateLuck",
  description: "Generates a luck-based object with weighted distributions for rare groups.",
  params: [
    {
      name: "groups",
      description: "Array of rare animal groups.",
      type: "Array",
      required: true, 
    }
  ],
  code: `
    $jsonLoad[result;{}]
    $jsonLoad[groups;$env[groups]]

    $arrayForEach[groups;group;
      $let[common;$nullish[$env[group;0];$env[group;1]]]
      $let[total;$getAnimalInfo[$get[common];rarity.1]]
      $let[isRare;$getAnimalInfo[$get[common];isRare]]

      $arrayCreate[attempts]

      $loop[$math[$arrayLength[group]-1];
        $let[rare;$env[group;$env[i]]]
        $if[$and[$includes[$get[rare];shop];$advArrayIncludes[$env[userProfile;userPacks];lockedSP]==false];$continue]
        $let[count;$getAnimalInfo[$get[rare];rarity.0]]

        $if[$get[count]!=;
          $arrayCreate[tmp;$get[count]]
          $arrayFill[tmp;$get[rare]]
          $arrayConcat[attempts;attempts;tmp]
        ]
      ;i;true]
      $!arrayReverse[attempts]

      $if[$get[isRare];
        $arrayCreate[regular;$math[$get[total] - $arrayLength[attempts]]]
      ;
        $arrayCreate[regular;$getAnimalInfo[$get[common];rarity.0]]
        $arrayFill[regular;$get[common]]
      ]

      $arrayConcat[attempts;attempts;regular]

      $!jsonSet[result;$get[common];$env[attempts]]
    ]

    $return[$env[result]]
  `
}
