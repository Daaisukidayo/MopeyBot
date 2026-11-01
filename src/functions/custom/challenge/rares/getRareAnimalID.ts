import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "getRareAnimalID",
  description: "the rare's ID from one of its abbreviations (see snora)",
  output: ArgType.String,
  params: [
    {
      name: "alias",
      description: "the rare's abbreviation",
      type: ArgType.String,
    },
  ],
  code: `
    $c[check the list first, user input could be stuff like 'constructor']
    $getCache[rares;allRares;allRares]
    $if[$arrayIncludes[allRares;$env[alias]]==false;$return[undefined]]

    $getCache[rares;rareByAbbreviation;rareByAbbreviation]
    $return[$jsonGet[rareByAbbreviation;$env[alias]]]
  `,
})
