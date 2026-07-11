import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({ 
  name: "getRareAnimalID",
  description: "Returns the rare animal's ID based on one of its abbreviations from the snora command.",
  output: ArgType.String,
  params: [
    {
      name: "_alias",
      description: "Abbreviation of the rare animal.",
      type: ArgType.String,
    }
  ],
  code: `
    $forOf[$jsonEntries[$getGlobalVar[allRareAbbreviations]];e;
      $if[$arrayIncludes[$env[e;1];$env[_alias]]==false;$continue]
      $let[animalId;$env[e;0]]
      $break
    ]

    $return[$default[$get[animalId];undefined]]
  `
})