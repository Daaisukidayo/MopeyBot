import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "getRareAnimalID",
  description: "Returns the rare animal's ID based on one of its abbreviations from the snora command.",
  output: ArgType.String,
  params: [
    {
      name: "alias",
      description: "Abbreviation of the rare animal.",
      type: ArgType.String,
    },
  ],
  code: `
    $c[Checked against the list first: user input could name a key like 'constructor']
    $getCache[rares;allRares;allRares]
    $if[$arrayIncludes[allRares;$env[alias]]==false;$return[undefined]]

    $getCache[rares;rareByAbbreviation;rareByAbbreviation]
    $return[$jsonGet[rareByAbbreviation;$env[alias]]]
  `,
})
