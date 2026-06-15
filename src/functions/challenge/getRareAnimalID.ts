export default { 
  name: "getRareAnimalID",
  description: "Returns the rare animal's ID based on one of its abbreviations from the snora command.",
  params: [
    {
      name: "_alias",
      description: "Abbreviation of the rare animal.",
      required: true,
    }
  ],
  output: "String",
  code: `
    $jsonLoad[entries;$jsonEntries[$getGlobalVar[allRareAbbreviations]]]

    $loop[$arrayLength[entries];
      $let[i;$math[$env[i] - 1]]
      $if[$arrayIncludes[$env[entries;$get[i];1];$env[_alias]]==false;
        $continue
      ]
      $let[animalId;$env[entries;$get[i];0]]
      $break
    ;i;true]

    $return[$default[$get[animalId];undefined]]
  `
}